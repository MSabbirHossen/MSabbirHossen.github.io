export default function Input({
  label,
  id,
  error,
  helperText,
  multiline = false,
  rows = 4,
  className = '',
  labelClassName = '',
  inputClassName = '',
  required = false,
  ...props
}) {
  const controlId = id || props.name;
  const Control = multiline ? 'textarea' : 'input';

  const baseControlClass =
    'w-full rounded-xl border border-default bg-surface/70 px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20';

  return (
    <label className={`block space-y-2 ${className}`} htmlFor={controlId}>
      {label && (
        <span className={`text-sm font-medium text-primary ${labelClassName}`}>
          {label}
          {required && <span className="ml-1 text-accent-secondary">*</span>}
        </span>
      )}

      <Control
        id={controlId}
        rows={multiline ? rows : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${controlId}-error` : helperText ? `${controlId}-help` : undefined
        }
        className={`${baseControlClass} ${error ? 'border-accent-danger/60 focus:border-accent-danger focus:ring-accent-danger/20' : ''} ${inputClassName}`}
        {...props}
      />

      {helperText && !error && (
        <p id={`${controlId}-help`} className="text-xs text-muted">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${controlId}-error`} className="text-xs font-medium text-accent-danger">
          {error}
        </p>
      )}
    </label>
  );
}
