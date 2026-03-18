import { useAuth } from "../../context/AuthContext";
import { titleCase } from "../utils/formatters";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <p className="navbar__eyebrow">Banking Operations Console</p>
        <h2>Welcome back, {user?.name || "Operator"}</h2>
      </div>
      <div className="navbar__actions">
        <span className="role-pill">{titleCase(user?.role)}</span>
        <button className="ghost-button" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </header>
  );
}
