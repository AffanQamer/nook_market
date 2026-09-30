import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>Nook Market</strong>
          <p className="muted">A demo store built with React. No real orders or payments.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
      <p className="container muted copyright">© {new Date().getFullYear()} Nook Market. Product data from Fake Store API.</p>
    </footer>
  );
}
