import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useFetch from '../hooks/useFetch.js';
import { useCart } from '../context/CartContext.jsx';
import { fetchProduct } from '../services/api.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useFetch(() => fetchProduct(id), [id]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (loading) return <div className="container"><LoadingSpinner label="Loading product..." /></div>;
  if (error) return <div className="container"><ErrorMessage message={error} onRetry={retry} /></div>;
  if (!product) return <div className="container"><ErrorMessage message="This product could not be found." /></div>;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  return (
    <div className="container section">
      <Link to="/products" className="btn btn-outline">← Back to Products</Link>
      <div className="details">
        <div className="details-img card"><img src={product.image} alt={product.title} /></div>
        <div className="details-info">
          <span className="tag">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="rating">★ {product.rating.rate} <span>({product.rating.count} reviews)</span></p>
          <p className="price price-lg">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="details-actions">
            <QuantitySelector value={quantity} onChange={(next) => { setQuantity(Math.max(1, next)); setAdded(false); }} />
            <Button onClick={handleAdd}>Add to Cart</Button>
          </div>
          {added && (
            <p className="success" role="status">
              Added {quantity} to your cart. <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
