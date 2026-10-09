import { Link } from "react-router-dom";
import { categoryLabel } from "../categories.js";

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Home() {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1>Un magazin mic, cu prețul pe etichetă.</h1>
        <p>
          Răsfoiește haine, bijuterii și electronice. Deschide orice etichetă
          ca să vezi detaliile.
        </p>
        <Link to="/products" className="btn">
          Vezi produsele
        </Link>
      </div>

      <div className="hang">
        <div className="hang__tag">
          <h2>Mini Store</h2>
          <p className="muted">Alege o categorie</p>
          <ul className="hang__list">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link to={`/products?category=${encodeURIComponent(c)}`}>
                  {categoryLabel(c)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}