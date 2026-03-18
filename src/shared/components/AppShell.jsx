import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <Navbar />
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
