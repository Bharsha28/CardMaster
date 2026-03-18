import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const accountService = {
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("accounts", "accountId", id) || listDemo("accounts")[0];
    }
    const response = await api.get(`/api/accounts/${id}`);
    return response.data;
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("accounts", "accountId", {
        cardId: Number(payload.cardId),
        applicationId: 1,
        creditLimit: 250000,
        availableLimit: 250000,
        openDate: new Date().toISOString().slice(0, 10),
        status: "ACTIVE",
      });
    }
    const response = await api.post("/api/accounts", { cardId: Number(payload.cardId) });
    return response.data;
  },
  async useCard(id, amount) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("accounts", "accountId", id);
      return upsertDemoItem("accounts", "accountId", {
        ...existing,
        accountId: Number(id),
        availableLimit: Number(existing.availableLimit) - Number(amount),
      });
    }
    const response = await api.post(`/api/accounts/use/${id}`, null, {
      params: { amount: Number(amount) },
    });
    return response.data;
  },
};

export default accountService;
