import fs from 'fs';

const username = 'MSabbirHossen';
const token = process.env.GH_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`${url}\n${res.status}`);
  }

  return res.json();
}

async function main() {
  const user = await fetchJSON(`https://api.github.com/users/${username}`);

  const repos = await fetchJSON(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const languages = {};

  repos.forEach((repo) => {
    if (!repo.language) return;

    languages[repo.language] = (languages[repo.language] || 0) + 1;
  });

  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
    }));

  const recentRepos = repos.slice(0, 6).map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    updated: repo.updated_at,
  }));

  const stats = {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    topLanguages,
    recentRepos,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync('./public/stats.json', JSON.stringify(stats, null, 2));

  console.log('stats.json updated');
}

main();
