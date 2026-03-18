import api from "../../../shared/services/api";
import { getDemoItem, isDemoToken, listDemo } from "../../../shared/utils/demoData";

const underwritingService = {
  async listApplications() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("applications");
    }
    const response = await api.get("/applications");
    return response.data?.data || [];
  },
  async getLatestScore(applicationId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const application = getDemoItem("applications", "applicationId", applicationId);
      return {
        scoreId: 1,
        applicationId: Number(applicationId),
        bureauScore: 742,
        internalScore: 781,
        generatedDate: new Date().toISOString().slice(0, 10),
        requestedLimit: application?.requestedLimit,
      };
    }
    const response = await api.get(`/applications/${applicationId}/scores/latest`);
    return response.data;
  },
  async generateScore(applicationId, payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return {
        scoreId: 1,
        applicationId: Number(applicationId),
        bureauScore: Number(payload.bureauScore),
        internalScore: Math.min(900, Number(payload.bureauScore) + 25),
        generatedDate: new Date().toISOString().slice(0, 10),
      };
    }
    const response = await api.post(`/applications/${applicationId}/scores`, {
      bureauScore: Number(payload.bureauScore),
    });
    return response.data;
  },
  async getLatestDecision(applicationId) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return {
        decisionId: 1,
        applicationId: Number(applicationId),
        underwriterId: 1,
        decision: "APPROVE",
        approvedLimit: 200000,
        remarks: "Demo decision",
        decisionDate: new Date().toISOString().slice(0, 10),
      };
    }
    const response = await api.get(`/applications/${applicationId}/decisions/latest`);
    return response.data;
  },
  async createDecision(applicationId, payload) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return {
        decisionId: 1,
        applicationId: Number(applicationId),
        underwriterId: 1,
        decision: payload.decision,
        approvedLimit: Number(payload.approvedLimit),
        remarks: payload.remarks,
        decisionDate: new Date().toISOString().slice(0, 10),
      };
    }
    const response = await api.post(`/applications/${applicationId}/decisions`, {
      decision: payload.decision,
      approvedLimit: Number(payload.approvedLimit),
      remarks: payload.remarks,
    });
    return response.data;
  },
};

export default underwritingService;
