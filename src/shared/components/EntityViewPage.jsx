import { useEffect, useState } from "react";
import AppShell from "./AppShell";
import PageHeader from "./PageHeader";
import { currency, date, dateTime, titleCase } from "../utils/formatters";

export default function EntityViewPage({ title, eyebrow, description, loadData, fields }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const payload = await loadData();
        if (active) {
          setData(payload);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError?.response?.data?.message || requestError?.message || "Unable to load");
        }
      }
    }

    fetchData();
    return () => {
      active = false;
    };
  }, [loadData]);

  return (
    <AppShell>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="card view-card">
        {error ? <p className="error-banner">{error}</p> : null}
        {!data && !error ? <p>Loading details...</p> : null}
        {data ? (
          <div className="view-grid">
            {fields.map((field) => (
              <div key={field.key} className="view-item">
                <span>{field.label}</span>
                <strong>{formatValue(field.format, data[field.key])}</strong>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}

function formatValue(format, value) {
  if (format === "currency") {
    return currency(value);
  }
  if (format === "date") {
    return date(value);
  }
  if (format === "dateTime") {
    return dateTime(value);
  }
  if (format === "title") {
    return titleCase(value);
  }
  return value ?? "-";
}
