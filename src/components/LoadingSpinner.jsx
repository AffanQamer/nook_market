export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="state-box" role="status">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
