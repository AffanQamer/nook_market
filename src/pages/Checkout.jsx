import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/formatPrice.js';

const emptyForm = { fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', payment: 'cash' };

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [order, setOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulated order: no server, no real payment.
    setOrder({ number: `NM-${Date.now().toString().slice(-6)}`, total: totalPrice, name: form.fullName });
    clearCart();
  };

  if (order) {
    return (
      <div className="container state-box">
        <h1>Thank you, {order.name.trim().split(' ')[0]}!</h1>
        <p className="success">Your order <strong>{order.number}</strong> for {formatPrice(order.total)} has been placed.</p>
        <p className="muted">This is a demo, so nothing was charged or shipped.</p>
        <Link to="/products" className="btn btn-primary">Continue shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container state-box">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <div className="cart-layout">
        <form className="card form" onSubmit={handleSubmit}>
          <label>Full name<input name="fullName" value={form.fullName} onChange={handleChange} required /></label>
          <div className="form-row">
            <label>Email<input type="email" name="email" value={form.email} onChange={handleChange} required /></label>
            <label>Phone<input type="tel" name="phone" value={form.phone} onChange={handleChange} required minLength={7} /></label>
          </div>
          <label>Address<input name="address" value={form.address} onChange={handleChange} required /></label>
          <div className="form-row">
            <label>City<input name="city" value={form.city} onChange={handleChange} required /></label>
            <label>Postal code<input name="postalCode" value={form.postalCode} onChange={handleChange} required /></label>
          </div>
          <label>Payment method
            <select name="payment" value={form.payment} onChange={handleChange}>
              <option value="cash">Cash on delivery</option>
              <option value="card">Credit card (simulated)</option>
              <option value="paypal">PayPal (simulated)</option>
            </select>
          </label>
          <Button type="submit">Place order</Button>
          <p className="muted small">Demo only. No payment is processed.</p>
        </form>

        <aside className="card summary">
          <h2>Your order</h2>
          {items.map((item) => (
            <p className="row" key={item.id}>
              <span>{item.quantity} × {item.title.slice(0, 26)}…</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </p>
          ))}
          <p className="row total"><span>Total</span><span>{formatPrice(totalPrice)}</span></p>
        </aside>
      </div>
    </div>
  );
}
