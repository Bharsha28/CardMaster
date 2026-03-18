import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { getDemoItem, isDemoToken, listDemo, registerDemoUser } from "../../../shared/utils/demoData";

const userService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("users").map(({ password, ...user }) => user);
    }
    const response = await api.get("/users");
    return unwrapResponse(response);
  },
  async getById(userId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const { password, ...user } = getDemoItem("users", "userId", userId);
      return user;
    }
    const response = await api.get(`/users/${userId}`);
    return unwrapResponse(response);
  },
  async create(payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token")) || payload.demoMode) {
      const { password, ...user } = registerDemoUser(payload);
      return user;
    }
    const response = await api.post("/users/register", payload);
    return unwrapResponse(response);
  },
};

export default userService;
