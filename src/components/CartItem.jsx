import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, price, image, quantity } = item;

  return (
    <li className="cart-item card">
      <img src={image} alt={title} />
      <div className="cart-info">
        <Link to={`/products/${id}`}><h3>{title}</h3></Link>
        <p className="muted">{formatPrice(price)} each</p>
        <button className="link-btn" onClick={() => removeFromCart(id)}>Remove</button>
      </div>
      <QuantitySelector value={quantity} onChange={(next) => updateQuantity(id, next)} />
      <p className="price subtotal">{formatPrice(price * quantity)}</p>
    </li>
  );
}
