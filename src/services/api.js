// All API calls live here so the UI components stay simple.
const BASE_URL = 'https://fakestoreapi.com';

const getJson = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`Request failed (status ${response.status})`);
  const text = await response.text();
  return text ? JSON.parse(text) : null; // the API returns an empty body for unknown ids
};

export const fetchProducts = () => getJson('/products');
export const fetchProduct = (id) => getJson(`/products/${id}`);
export const fetchCategories = () => getJson('/products/categories');
