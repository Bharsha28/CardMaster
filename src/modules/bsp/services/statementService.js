import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const statementService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("statements");
    }
    const response = await api.get("/billing/statements");
    return response.data || [];
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("statements", "statementId", id);
    }
    const response = await api.get(`/billing/statements/${id}`);
    return response.data;
  },
  async generate(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("statements", "statementId", {
        ...payload,
        accountId: Number(payload.accountId),
        totalDue: Number(payload.totalDue || 25000),
        minimumDue: Number(payload.minimumDue || 2500),
        generatedDate: new Date().toISOString().slice(0, 10),
      });
    }
    const response = await api.post("/billing/statements/generate", {
      ...payload,
      accountId: Number(payload.accountId),
    });
    return response.data;
  },
  async close(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("statements", "statementId", id);
      return upsertDemoItem("statements", "statementId", { ...existing, statementId: Number(id), status: "CLOSED" });
    }
    const response = await api.post(`/billing/statements/close/${id}`);
    return response.data;
  },
};

export default statementService;
