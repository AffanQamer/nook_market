import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useFetch from '../hooks/useFetch.js';
import { fetchProducts, fetchCategories } from '../services/api.js';

export default function Home() {
  const products = useFetch(fetchProducts);
  const categories = useFetch(fetchCategories);

  // Featured = the four best-rated products
  const featured = products.data
    ? [...products.data].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)
    : [];

  return (
    <>
      <section className="container hero">
        <div>
          <h1>Everyday things, picked with care.</h1>
          <p>Clothing, jewelery and electronics at honest prices. Browse the whole shop or jump straight to what you need.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-accent btn-lg">Shop Now</Link>
            <Link to="/#categories" className="btn btn-ghost btn-lg">Browse categories</Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>Featured products</h2>
        {products.loading && <LoadingSpinner />}
        {products.error && <ErrorMessage message={products.error} onRetry={products.retry} />}
        {products.data && <ProductGrid products={featured} />}
      </section>

      <section className="container section" id="categories">
        <h2>Shop by category</h2>
        {categories.loading && <LoadingSpinner />}
        {categories.error && <ErrorMessage message={categories.error} onRetry={categories.retry} />}
        {categories.data && (
          <div className="category-grid">
            {categories.data.map((category) => (
              <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-tile">
                {category}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="container section">
        <div className="promo">
          <div>
            <h2>Free delivery on orders over $100</h2>
            <p>Fill your cart, check out in under a minute. It is a demo, so nothing is actually charged.</p>
          </div>
          <Link to="/products" className="btn btn-accent btn-lg">Shop Now</Link>
        </div>
      </section>
    </>
  );
}
