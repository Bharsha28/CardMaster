import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const transactionService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("transactions");
    }
    const response = await api.get("/transactions");
    return response.data || [];
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("transactions", "transactionId", id);
    }
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
  async authorize(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("transactions", "transactionId", {
        ...payload,
        accountId: Number(payload.accountId),
        amount: Number(payload.amount),
        transactionDate: new Date().toISOString(),
        status: "AUTHORIZED",
      });
    }
    const response = await api.post("/transactions/authorize", {
      ...payload,
      accountId: Number(payload.accountId),
      amount: Number(payload.amount),
    });
    return response.data;
  },
  async post(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("transactions", "transactionId", id);
      return upsertDemoItem("transactions", "transactionId", { ...existing, transactionId: Number(id), status: "POSTED" });
    }
    const response = await api.post(`/transactions/post/${id}`);
    return response.data;
  },
  async reverse(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("transactions", "transactionId", id);
      return upsertDemoItem("transactions", "transactionId", { ...existing, transactionId: Number(id), status: "REVERSED" });
    }
    const response = await api.post(`/transactions/reverse/${id}`);
    return response.data;
  },
};

export default transactionService;
