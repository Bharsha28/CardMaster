import { NavLink } from "react-router-dom";
import { moduleNavigation } from "../constants/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const items = moduleNavigation.filter((module) => module.roles.includes(user?.role));

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__eyebrow">CardMaster</span>
        <h1>Credit Card System</h1>
      </div>

      <nav className="sidebar__nav">
        {items.map((module) => (
          <section key={module.key} className="sidebar__module">
            {module.links
              .filter((link) => !link.roles || link.roles.includes(user?.role))
              .map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")}
              >
                {link.label}
              </NavLink>
              ))}
          </section>
        ))}
      </nav>
    </aside>
  );
}
