import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ROLE_HOME } from "../../../shared/constants/roles";
import { getAllDemoCredentials, getDemoCredentials } from "../../../shared/utils/demoData";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const demoCredentials = getAllDemoCredentials();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const user = await login(formData);
      navigate(ROLE_HOME[user?.role] || "/paa/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError?.response?.data?.msg || requestError?.message || "Login failed");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>Sign in to CardMaster</h1>
        <p className="page-header__description">Use your Spring Boot user credentials to access the module workspace assigned to your role.</p>
        <div className="card" style={{ marginTop: 16, marginBottom: 16, padding: 16 }}>
          <p className="inline-notice" style={{ marginTop: 0 }}>
            Demo credentials
          </p>
          {demoCredentials.map((entry) => (
            <p key={entry.role} style={{ margin: "6px 0" }}>
              <strong>{entry.role}</strong>: {entry.email} / {entry.password}
            </p>
          ))}
        </div>
        <LoginForm
          formData={formData}
          error={error}
          onChange={(key, value) => setFormData((current) => ({ ...current, [key]: value }))}
          onSubmit={handleSubmit}
          onDemoFill={() => setFormData(getDemoCredentials())}
        />
        <div style={{ marginTop: 16 }}>
          <Link className="text-link" to="/register">
            Create test account
          </Link>
        </div>
      </div>
    </div>
  );
}
