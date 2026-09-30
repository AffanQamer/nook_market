import Button from './Button.jsx';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}
