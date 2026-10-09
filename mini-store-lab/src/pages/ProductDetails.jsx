import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api.js";
import { categoryLabel } from "../categories.js";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProduct(id)
      .then((data) => {
        if (!cancelled) setProduct(data);
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
  }, [id]);

  if (loading) return <p className="state">Loading...</p>;

  if (error || !product) {
    return (
      <section>
        <p className="state state--error">Unable to load product.</p>
        <Link to="/products" className="btn btn--ghost">
          Înapoi la produse
        </Link>
      </section>
    );
  }

  return (
    <section className="details">
      <img className="details__img" src={product.image} alt={product.title} />
      <div className="details__body">
        <p className="muted">Product details...</p>
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="muted">Categorie: {categoryLabel(product.category)}</p>
        <p>{product.description}</p>
        <Link to="/products" className="btn btn--ghost">
          Înapoi la produse
        </Link>
      </div>
    </section>
  );
}