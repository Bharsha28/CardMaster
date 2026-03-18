import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import productService from "../../cpl/services/productService";
import customerService from "../services/customerService";
import applicationService from "../services/applicationService";

export default function ApplicationAddPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    productId: "",
    requestedLimit: "",
    status: "SUBMITTED",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    productService.list().then((items) => setProducts(items.filter((item) => item.status !== "DISCONTINUED")));
    customerService.getCurrentCustomer(user).then(setCurrentCustomer);
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!currentCustomer?.customerId) {
      setError("Customer profile is not available for this login.");
      return;
    }

    await applicationService.create({
      customerId: currentCustomer.customerId,
      productId: formData.productId,
      requestedLimit: formData.requestedLimit,
      status: "SUBMITTED",
    });
    navigate("/paa/applications");
  }

  return (
    <AppShell>
      <PageHeader
        title="Apply for Credit Card"
        description="Submit your credit card application by choosing a card product and requested limit. Customer details are taken from your profile."
      />
      <div className="card form-card">
        {currentCustomer ? (
          <p className="inline-notice">
            Applying as <strong>{currentCustomer.name}</strong>
          </p>
        ) : null}
        {error ? <p className="error-banner">{error}</p> : null}
        <form className="entity-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Card Product</span>
            <select
              className="input"
              value={formData.productId}
              onChange={(event) => setFormData((value) => ({ ...value, productId: event.target.value }))}
            >
              <option value="">Select card product</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.name} ({product.category})
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Requested Limit</span>
            <input
              className="input"
              type="number"
              value={formData.requestedLimit}
              onChange={(event) => setFormData((value) => ({ ...value, requestedLimit: event.target.value }))}
            />
          </label>
          <label className="field">
            <span>Application Status</span>
            <input className="input" value="SUBMITTED" readOnly />
          </label>
          <button className="primary-button" type="submit">
            Submit Application
          </button>
        </form>
      </div>
    </AppShell>
  );
}
