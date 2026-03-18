import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const productService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("products");
    }
    const response = await api.get("/api/products");
    return response.data || [];
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("products", "productId", id);
    }
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("products", "productId", {
        ...payload,
        interestRate: Number(payload.interestRate),
        annualFee: Number(payload.annualFee),
      });
    }
    const response = await api.post("/api/products", {
      ...payload,
      interestRate: Number(payload.interestRate),
      annualFee: Number(payload.annualFee),
    });
    return response.data;
  },
};

export default productService;
