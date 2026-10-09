import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Pagina nu există.</p>
      <Link to="/" className="btn">
        Acasă
      </Link>
    </section>
  );
}