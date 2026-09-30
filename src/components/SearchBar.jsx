export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search products' }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </form>
  );
}
