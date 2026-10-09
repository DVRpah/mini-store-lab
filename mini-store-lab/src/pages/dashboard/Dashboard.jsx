import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Prezentare", end: true },
  { to: "/dashboard/profile", label: "Profil" },
  { to: "/dashboard/settings", label: "Setări" },
];

export default function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>

      <div className="dash">
        <nav className="subnav" aria-label="Secțiuni dashboard">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                isActive ? "subnav__link is-active" : "subnav__link"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="panel">
          <Outlet />
        </div>
      </div>
    </section>
  );
}