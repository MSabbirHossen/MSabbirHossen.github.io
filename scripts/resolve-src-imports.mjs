import { access } from 'node:fs/promises';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    if (!specifier.startsWith('.') || !context.parentURL?.includes('/src/')) {
      throw error;
    }

    const parentDirectory = dirname(fileURLToPath(context.parentURL));
    const candidates = [
      resolvePath(parentDirectory, `${specifier}.js`),
      resolvePath(parentDirectory, specifier, 'index.js'),
    ];

    for (const candidate of candidates) {
      try {
        await access(candidate);
        return nextResolve(pathToFileURL(candidate).href, context);
      } catch {
        // Try the next Vite-style candidate.
      }
    }

    throw error;
  }
}
