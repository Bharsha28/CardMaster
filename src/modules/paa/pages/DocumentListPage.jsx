import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { useAuth } from "../../../context/AuthContext";
import { date } from "../../../shared/utils/formatters";
import { buildId } from "../../../shared/utils/apiResponse";
import { canManageDocuments, canUploadDocuments } from "../../../shared/utils/access";
import applicationService from "../services/applicationService";
import customerService from "../services/customerService";
import documentService from "../services/documentService";

export default function DocumentListPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      const documents = await documentService.list();
      if (user?.role !== "CUSTOMER") {
        setRows(documents.map((row) => ({ ...row, id: buildId(row, ["documentId"]) })));
        return;
      }

      const customer = await customerService.getCurrentCustomer(user);
      const applications = customer?.customerId ? await applicationService.getByCustomer(customer.customerId) : [];
      const applicationIds = new Set(applications.map((item) => item.applicationId));
      setRows(
        documents
          .filter((document) => applicationIds.has(document.applicationId))
          .map((row) => ({ ...row, id: buildId(row, ["documentId"]) })),
      );
    }

    load();
  }, [user]);

  return (
    <EntityListPage
      eyebrow="PAA"
      title="Documents"
      description="Track KYC and application support documents."
      addPath="/paa/documents/add"
      basePath="/paa/documents"
      showAdd={canUploadDocuments(user?.role)}
      showEdit={canManageDocuments(user?.role)}
      searchFields={["documentId", "applicationId", "documentType", "status"]}
      rows={rows}
      columns={[
        { key: "documentId", label: "Document ID" },
        { key: "applicationId", label: "Application ID" },
        { key: "documentType", label: "Type" },
        { key: "uploadedDate", label: "Uploaded", render: (row) => date(row.uploadedDate) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
