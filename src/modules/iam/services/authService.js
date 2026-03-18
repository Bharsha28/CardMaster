import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { loginDemoUser } from "../../../shared/utils/demoData";

const authService = {
  async login(credentials) {
    const demoToken = loginDemoUser(credentials);
    if (demoToken) {
      return demoToken;
    }
    const response = await api.post("/users/login", credentials);
    return unwrapResponse(response);
  },
  async logout() {
    const response = await api.post("/users/logout");
    return unwrapResponse(response);
  },
};

export default authService;
