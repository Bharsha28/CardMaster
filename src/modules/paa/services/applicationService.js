import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const applicationService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("applications");
    }
    const response = await api.get("/applications");
    return unwrapResponse(response);
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("applications", "applicationId", id);
    }
    const response = await api.get(`/applications/${id}`);
    return unwrapResponse(response);
  },
  async create(payload) {
    const normalized = {
      ...payload,
      customerId: Number(payload.customerId),
      productId: Number(payload.productId),
      requestedLimit: Number(payload.requestedLimit),
      status: payload.status || "SUBMITTED",
    };

    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("applications", "applicationId", {
        ...normalized,
        applicationDate: new Date().toISOString().slice(0, 10),
      });
    }
    const response = await api.post("/applications", normalized);
    return unwrapResponse(response);
  },
  async updateStatus(id, status) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("applications", "applicationId", id);
      return upsertDemoItem("applications", "applicationId", { ...existing, applicationId: Number(id), status });
    }
    const response = await api.put(`/applications/${id}/status`, null, { params: { status } });
    return unwrapResponse(response);
  },
  async getByCustomer(customerId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("applications").filter((item) => String(item.customerId) === String(customerId));
    }
    const response = await api.get(`/applications/customer/${customerId}`);
    return unwrapResponse(response);
  },
};

export default applicationService;
