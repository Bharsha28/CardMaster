import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "./AppShell";
import PageHeader from "./PageHeader";

export default function EntityFormPage({
  title,
  eyebrow,
  description,
  fields,
  initialValues,
  loadValues,
  onSubmit,
  successPath,
  submitLabel = "Save",
  notice,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(Boolean(loadValues));
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function hydrate() {
      if (!loadValues) {
        return;
      }

      try {
        const values = await loadValues();
        if (active) {
          setFormData(values);
        }
      } catch (requestError) {
        if (active) {
          setError(extractMessage(requestError));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    hydrate();
    return () => {
      active = false;
    };
  }, [loadValues]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await onSubmit(formData);
      navigate(successPath);
    } catch (requestError) {
      setError(extractMessage(requestError));
    }
  }

  return (
    <AppShell>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="card form-card">
        {notice ? <p className="inline-notice">{notice}</p> : null}
        {error ? <p className="error-banner">{error}</p> : null}
        {loading ? (
          <p>Loading form...</p>
        ) : (
          <form className="entity-form" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <label key={field.name} className="field">
                <span>{field.label}</span>
                {field.type === "select" ? (
                  <select
                    className="input"
                    value={formData[field.name] ?? ""}
                    onChange={(event) => setFormData((value) => ({ ...value, [field.name]: event.target.value }))}
                  >
                    <option value="">Select</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    className="input input--textarea"
                    value={formData[field.name] ?? ""}
                    onChange={(event) => setFormData((value) => ({ ...value, [field.name]: event.target.value }))}
                  />
                ) : (
                  <input
                    className="input"
                    type={field.type || "text"}
                    value={formData[field.name] ?? ""}
                    onChange={(event) => setFormData((value) => ({ ...value, [field.name]: event.target.value }))}
                  />
                )}
              </label>
            ))}
            <button className="primary-button" type="submit">
              {submitLabel}
            </button>
          </form>
        )}
      </div>
    </AppShell>
  );
}

function extractMessage(error) {
  return error?.response?.data?.message || error?.response?.data?.msg || error?.message || "Request failed";
}
