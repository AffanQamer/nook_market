import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, title, price, image, category, rating } = product;

  return (
    <article className="card product-card">
      <Link to={`/products/${id}`} className="product-img">
        <img src={image} alt={title} loading="lazy" />
      </Link>
      <div className="product-body">
        <span className="tag">{category}</span>
        <h3 title={title}>{title}</h3>
        <p className="rating">★ {rating.rate} <span>({rating.count})</span></p>
        <p className="price">{formatPrice(price)}</p>
        <div className="card-actions">
          <Link to={`/products/${id}`} className="btn btn-outline">View Details</Link>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </article>
  );
}
