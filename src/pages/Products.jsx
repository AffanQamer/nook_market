import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchProducts, fetchCategories } from '../services/api.js';

export default function Products() {
  // Filters live in the URL (?search=...&category=...&sort=...) so links can be shared.
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'default';

  const products = useFetch(fetchProducts);
  const categories = useFetch(fetchCategories);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all' && value !== 'default') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const getVisibleProducts = () => {
    let result = products.data.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'all' || product.category === category)
    );
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
    return result;
  };

  const renderContent = () => {
    if (products.loading) return <LoadingSpinner label="Loading products..." />;
    if (products.error) return <ErrorMessage message={products.error} onRetry={products.retry} />;
    if (!products.data || products.data.length === 0) return <div className="state-box"><p>No products are available right now.</p></div>;

    const visible = getVisibleProducts();
    if (visible.length === 0) {
      return (
        <div className="state-box">
          <h2>No matches</h2>
          <p>Try a different search or category.</p>
        </div>
      );
    }
    return (
      <>
        <p className="muted">{visible.length} product{visible.length === 1 ? '' : 's'}</p>
        <ProductGrid products={visible} />
      </>
    );
  };

  return (
    <div className="container section">
      <h1>All products</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={(value) => updateParam('search', value)} />
        <select value={sort} onChange={(event) => updateParam('sort', event.target.value)} aria-label="Sort products">
          <option value="default">Sort by: Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Rating: best first</option>
        </select>
      </div>
      {categories.data && (
        <CategoryFilter categories={categories.data} selected={category} onChange={(value) => updateParam('category', value)} />
      )}
      {renderContent()}
    </div>
  );
}
