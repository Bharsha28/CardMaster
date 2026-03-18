import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { isDemoToken, listDemo } from "../../../shared/utils/demoData";

const auditLogService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("auditLogs");
    }
    const response = await api.get("/auditlogs");
    return unwrapResponse(response);
  },
};

export default auditLogService;
