import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          Proiect de laborator cu React și React Router, elaborat de Dan Vrancean.
        </div>
      </footer>
    </>
  );
}