import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container state-box">
        <h1>Your cart is empty</h1>
        <p>Add something you like and it will show up here.</p>
        <Link to="/products" className="btn btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Shopping cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => <CartItem key={item.id} item={item} />)}
        </ul>
        <aside className="card summary">
          <h2>Order summary</h2>
          <p className="row"><span>Items</span><span>{totalItems}</span></p>
          <p className="row total"><span>Total</span><span>{formatPrice(totalPrice)}</span></p>
          <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
          <button className="link-btn" onClick={clearCart}>Clear cart</button>
        </aside>
      </div>
    </div>
  );
}
