import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "CUSTOMER",
    password: "",
    demoMode: true,
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await userService.create(formData);
      navigate("/login");
    } catch (requestError) {
      setError(requestError?.response?.data?.msg || requestError?.message || "Registration failed");
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>Create Test Account</h1>
        <p className="page-header__description">This creates a frontend demo user so you can test the website without backend seed data.</p>
        <form onSubmit={handleSubmit}>
          {error ? <p className="error-banner">{error}</p> : null}
          <label className="field">
            <span>Name</span>
            <input className="input" value={formData.name} onChange={(event) => setFormData((value) => ({ ...value, name: event.target.value }))} />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" value={formData.email} onChange={(event) => setFormData((value) => ({ ...value, email: event.target.value }))} />
          </label>
          <label className="field">
            <span>Phone</span>
            <input className="input" value={formData.phone} onChange={(event) => setFormData((value) => ({ ...value, phone: event.target.value }))} />
          </label>
          <label className="field">
            <span>Role</span>
            <select className="input" value={formData.role} onChange={(event) => setFormData((value) => ({ ...value, role: event.target.value }))}>
              <option value="CUSTOMER">Customer</option>
              <option value="OFFICER">Officer</option>
              <option value="UNDERWRITER">Underwriter</option>
              <option value="RISK">Risk</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" type="password" value={formData.password} onChange={(event) => setFormData((value) => ({ ...value, password: event.target.value }))} />
          </label>
          <button className="primary-button" type="submit">
            Register
          </button>
          <Link className="text-link" to="/login">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
}
