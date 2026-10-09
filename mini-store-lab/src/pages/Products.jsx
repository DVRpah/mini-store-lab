import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../api.js";
import { categoryLabel } from "../categories.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  if (loading) return <p className="state">Loading...</p>;
  if (error) return <p className="state state--error">Nu s-au putut încărca produsele.</p>;

  const categories = [...new Set(products.map((p) => p.category))];

  let visible = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  if (sort === "price") {
    visible = [...visible].sort((a, b) => a.price - b.price);
  }

  return (
    <section>
      <h1>Produse</h1>

      <div className="filters">
        <input
          type="search"
          aria-label="Caută produs"
          placeholder="Caută..."
          value={search}
          onChange={(e) => updateParam("search", e.target.value)}
        />

        <select
          aria-label="Categorie"
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <option value="">Toate categoriile</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabel(c)}
            </option>
          ))}
        </select>

        <select
          aria-label="Sortare"
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
        >
          <option value="">Ordinea implicită</option>
          <option value="price">Preț crescător</option>
        </select>

        <button className="btn btn--ghost" onClick={() => setSearchParams({})}>
          Resetează
        </button>
      </div>

      <p className="muted">{visible.length} produse</p>

      {visible.length === 0 && (
        <p className="state">Niciun produs nu se potrivește filtrelor.</p>
      )}

      <ul className="tag-grid">
        {visible.map((p) => (
          <li key={p.id} className="tag-wrap">
            <article className="tag">
              <img className="tag__img" src={p.image} alt={p.title} />
              <h2 className="tag__title">{p.title}</h2>
              <p className="tag__category">{categoryLabel(p.category)}</p>
              <div className="tag__footer">
                <span className="price">${p.price.toFixed(2)}</span>
                <Link to={`/products/${p.id}`} className="btn">
                  Vezi detalii
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}