export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {['all', ...categories].map((category) => (
        <button
          key={category}
          className={`chip ${selected === category ? 'active' : ''}`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
