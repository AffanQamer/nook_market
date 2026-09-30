# Nook Market — Mini E-Commerce Store

A responsive online store built with React. Users can browse products from a live API, search, filter and sort them, view details, manage a persistent shopping cart and complete a simulated checkout.

## Features
- Home page with hero, featured products, category tiles and promo banner
- Products page with search, category filter, price and rating sorting
- Loading, error (with retry) and empty states for every API call
- Product details page with quantity selector
- Shopping cart with quantity controls, subtotals, total and remove/clear
- Cart saved in LocalStorage (survives page refresh)
- Simulated checkout form with order-number confirmation (no real payments)
- Responsive navbar with hamburger menu, live cart count and light/dark mode (remembered)
- Filters stored in the URL, so `/products?category=jewelery&sort=rating` can be shared

## Technologies Used
React 18 · JavaScript (ES6+) · React Router 6 · Fetch API · HTML5 · CSS3 (custom properties, Grid, Flexbox, media queries) · Vite · LocalStorage

## Screenshots
Add screenshots to a `screenshots/` folder and link them here:

| Home | Products | Cart |
|------|----------|------|
| ![Home](screenshots/home.png) | ![Products](screenshots/products.png) | ![Cart](screenshots/cart.png) |

## How to Install
```bash
git clone https://github.com/<your-username>/nook-market.git
cd nook-market
npm install
```

## How to Run Locally
```bash
npm run dev      # start the dev server at http://localhost:5173
npm run build    # create a production build in /dist
npm run preview  # preview the production build
```

## API Used
[Fake Store API](https://fakestoreapi.com) — free, no key required.
- `GET /products` — all products
- `GET /products/:id` — one product
- `GET /products/categories` — category names

All requests live in `src/services/api.js`.

## Project Structure
```
src/
├── components/   reusable UI (Navbar, ProductCard, CartItem, ...)
├── pages/        one file per route
├── context/      CartContext (global cart state)
├── hooks/        useFetch (loading / data / error)
├── services/     api.js (all fetch calls)
├── utils/        formatPrice helper
└── styles/       global.css (design tokens + responsive rules)
```

## What I Learned
- **Component thinking:** splitting the UI into small, reusable components (`ProductCard`, `QuantitySelector`, `Button`) that receive data through props.
- **State and effects:** `useState` for UI state, `useEffect` for fetching data and syncing the cart to LocalStorage, with cleanup to avoid updates after unmount.
- **Context API:** `CartContext` shares cart data with the navbar, product cards, cart and checkout without prop drilling.
- **Custom hook:** `useFetch` removes duplicated loading/error logic.
- **Routing:** React Router for pages, dynamic routes (`/products/:id`), query-string filters and hash links.
- **Async JavaScript:** `async/await` with `try/catch` and handling of non-OK responses.
- **Array methods:** `filter` for search, `find` to detect items already in the cart, `map` to render lists and update items, `reduce` for totals, plus destructuring and the spread operator for immutable updates.
- **Persistence:** reading and writing LocalStorage safely (with `try/catch` for corrupt data).
- **Responsive CSS:** CSS Grid `auto-fill`, media queries, CSS variables for light/dark theming.
- **Accessibility basics:** labels, `aria-label`s, focus outlines, `role="alert"` for errors, reduced-motion support.

## Future Improvements
- Product reviews and a wishlist
- Pagination or infinite scroll
- Form validation messages and address auto-complete
- Unit tests with Vitest and React Testing Library
- Real backend, user accounts and a payment provider (e.g. Stripe)
- Deploy to Vercel/Netlify (add a rewrite of all routes to `index.html` for client-side routing)
