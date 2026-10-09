import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Acasă", end: true },
  { to: "/products", label: "Produse" },
  { to: "/about", label: "Despre" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand">
          <span className="brand__hole" aria-hidden="true"></span>
          Mini Store
        </NavLink>
        <nav className="nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                isActive ? "nav__link is-active" : "nav__link"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}