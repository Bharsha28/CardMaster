import api from "../../../shared/services/api";
import { unwrapResponse } from "../../../shared/utils/apiResponse";
import { getDemoItem, isDemoToken, listDemo, upsertDemoItem } from "../../../shared/utils/demoData";

const documentService = {
  async list() {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return listDemo("documents");
    }
    const response = await api.get("/documents");
    return unwrapResponse(response);
  },
  async getById(id) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return getDemoItem("documents", "documentId", id);
    }
    const response = await api.get(`/documents/${id}`);
    return unwrapResponse(response);
  },
  async create(payload) {
    const normalized = {
      ...payload,
      applicationId: Number(payload.applicationId),
      fileURI: payload.file?.name || payload.fileURI,
      status: payload.status || "SUBMITTED",
    };

    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      return upsertDemoItem("documents", "documentId", {
        ...normalized,
        uploadedDate: new Date().toISOString().slice(0, 10),
      });
    }
    const response = await api.post("/documents", normalized);
    return unwrapResponse(response);
  },
  async updateStatus(id, status) {
    if (isDemoToken(localStorage.getItem("cardmaster_token"))) {
      const existing = getDemoItem("documents", "documentId", id);
      return upsertDemoItem("documents", "documentId", { ...existing, documentId: Number(id), status });
    }
    const response = await api.put(`/documents/${id}/status`, null, { params: { status } });
    return unwrapResponse(response);
  },
};

export default documentService;
