const BASE_URL = "https://fakestoreapi.com";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text = await res.text();
  if (!text) throw new Error("Not found");

  return JSON.parse(text);
}

export const getProducts = () => request("/products");
export const getProduct = (id) => request(`/products/${id}`);