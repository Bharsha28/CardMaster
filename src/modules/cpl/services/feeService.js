import api from "../../../shared/services/api";
import { isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const feeService = {
  async listByProduct(productId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("fees").filter((item) => String(item.productId) === String(productId));
    }
    const response = await api.get(`/api/fees/product/${productId}`);
    return response.data || [];
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("fees", "feeId", {
        productId: Number(payload.productId),
        feeType: payload.feeType,
        amount: Number(payload.amount),
      });
    }
    const response = await api.post("/api/fees", {
      productId: Number(payload.productId),
      feeType: payload.feeType,
      amount: Number(payload.amount),
    });
    return response.data;
  },
};

export default feeService;
