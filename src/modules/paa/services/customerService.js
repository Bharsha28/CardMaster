import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { getDemoCustomerForUser, getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const customerService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("customers");
    }
    const response = await api.get("/customers");
    return unwrapResponse(response);
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("customers", "customerId", id);
    }
    const response = await api.get(`/customers/${id}`);
    return unwrapResponse(response);
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("customers", "customerId", {
        ...payload,
        income: Number(payload.income),
        contactInfo: { email: payload.contactEmail, phone: payload.contactPhone, address: payload.contactAddress },
      });
    }
    const normalized = {
      ...payload,
      income: Number(payload.income),
      contactInfo: {
        email: payload.contactEmail,
        phone: payload.contactPhone,
        address: payload.contactAddress,
      },
    };
    const response = await api.post("/customers", normalized);
    return unwrapResponse(response);
  },
  async update(id, payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("customers", "customerId", {
        customerId: Number(id),
        ...payload,
        income: Number(payload.income),
        contactInfo: { email: payload.contactEmail, phone: payload.contactPhone, address: payload.contactAddress },
      });
    }
    const normalized = {
      ...payload,
      income: Number(payload.income),
      contactInfo: {
        email: payload.contactEmail,
        phone: payload.contactPhone,
        address: payload.contactAddress,
      },
    };
    const response = await api.put(`/customers/${id}`, normalized);
    return unwrapResponse(response);
  },
  async getCurrentCustomer(user) {
    const token = localStorage.getItem("cardmaster_token");
    if (isDemoToken(token)) {
      return getDemoCustomerForUser(token);
    }

    const customers = await this.list();
    return (
      customers.find((item) => item.contactInfo?.email === user?.email) ||
      customers.find((item) => item.name === user?.name) ||
      customers[0] ||
      null
    );
  },
};

export default customerService;
