import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const holdService = {
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("holds", "holdId", id);
    }
    const response = await api.get(`/transaction-holds/${id}`);
    return response.data;
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("holds", "holdId", {
        transactionId: Number(payload.transactionId),
        amount: Number(payload.amount),
        holdDate: new Date().toISOString(),
        releaseDate: null,
      });
    }
    const response = await api.post("/transaction-holds", {
      ...payload,
      transactionId: Number(payload.transactionId),
      amount: Number(payload.amount),
    });
    return response.data;
  },
  async listByTransaction(transactionId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("holds").filter((item) => String(item.transactionId) === String(transactionId));
    }
    const response = await api.get(`/transaction-holds/by-transaction/${transactionId}`);
    return response.data || [];
  },
  async release(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("holds", "holdId", id);
      return upsertDemoItem("holds", "holdId", { ...existing, holdId: Number(id), releaseDate: new Date().toISOString() });
    }
    const response = await api.post(`/transaction-holds/release/${id}`);
    return response.data;
  },
};

export default holdService;
