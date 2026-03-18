export default function LoginForm({ formData, error, onChange, onSubmit, onDemoFill }) {
  return (
    <form onSubmit={onSubmit}>
      {error ? <p className="error-banner">{error}</p> : null}
      <label className="field">
        <span>Email</span>
        <input className="input" type="email" value={formData.email} onChange={(event) => onChange("email", event.target.value)} />
      </label>
      <label className="field">
        <span>Password</span>
        <input
          className="input"
          type="password"
          value={formData.password}
          onChange={(event) => onChange("password", event.target.value)}
        />
      </label>
      <button className="primary-button" type="submit">
        Sign In
      </button>
      <button className="ghost-button" type="button" onClick={onDemoFill}>
        Use Demo Login
      </button>
    </form>
  );
}
