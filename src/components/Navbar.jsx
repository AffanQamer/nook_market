import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import { useCart } from '../context/CartContext.jsx';

const getInitialTheme = () =>
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Apply the theme to the whole page and remember it.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(searchText.trim())}`);
    closeMenu();
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={closeMenu}>Nook<span>Market</span></Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <Link to="/#categories" onClick={closeMenu}>Categories</Link>
          <SearchBar value={searchText} onChange={setSearchText} onSubmit={handleSearch} />
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <Link to="/cart" className="icon-btn cart-link" aria-label={`Cart, ${totalItems} items`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>
          <button
            className="icon-btn hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
