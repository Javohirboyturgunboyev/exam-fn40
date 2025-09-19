import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "./MainLayout.css";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/recipe", label: "Recipes" },
  ];

  return (
    <div className="layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>

        <div className={`nav-links ${open ? "active" : ""}`}>
         
          <button className="close-btn" onClick={() => setOpen(false)}>
            ✖️
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button className="browse-btn">Browse recipes</button>

        <button className="menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>


      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

     
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
