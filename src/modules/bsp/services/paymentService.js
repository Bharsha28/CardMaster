import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const paymentService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("payments");
    }
    const response = await api.get("/billing/payments");
    return response.data || [];
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("payments", "paymentId", id);
    }
    const response = await api.get(`/billing/payments/${id}`);
    return response.data;
  },
  async capture(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("payments", "paymentId", {
        ...payload,
        accountId: Number(payload.accountId),
        statementId: Number(payload.statementId),
        amount: Number(payload.amount),
        paymentDate: new Date().toISOString(),
      });
    }
    const response = await api.post("/billing/payments/capture", {
      ...payload,
      accountId: Number(payload.accountId),
      statementId: Number(payload.statementId),
      amount: Number(payload.amount),
    });
    return response.data;
  },
};

export default paymentService;
