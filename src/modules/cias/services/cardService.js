import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const cardService = {
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("cards", "cardId", id) || listDemo("cards")[0];
    }
    const response = await api.get(`/api/cards/${id}`);
    return response.data;
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("cards", "cardId", payload);
    }
    const response = await api.post("/api/cards", payload);
    return response.data;
  },
  async block(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("cards", "cardId", id);
      return upsertDemoItem("cards", "cardId", { ...existing, cardId: Number(id), status: "BLOCKED" });
    }
    const response = await api.post(`/api/cards/block/${id}`);
    return response.data;
  },
};

export default cardService;
