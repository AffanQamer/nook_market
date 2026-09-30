export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="qty">
      <button onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">−</button>
      <span aria-live="polite">{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}
