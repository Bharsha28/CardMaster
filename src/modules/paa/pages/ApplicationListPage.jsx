import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { useAuth } from "../../../context/AuthContext";
import { currency, date } from "../../../shared/utils/formatters";
import { buildId } from "../../../shared/utils/apiResponse";
import { canCreateApplication, canManageApplications } from "../../../shared/utils/access";
import applicationService from "../services/applicationService";
import customerService from "../services/customerService";

export default function ApplicationListPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      if (user?.role === "CUSTOMER") {
        const customer = await customerService.getCurrentCustomer(user);
        const data = customer?.customerId ? await applicationService.getByCustomer(customer.customerId) : [];
        setRows(data.map((row) => ({ ...row, id: buildId(row, ["applicationId"]) })));
        return;
      }
      const data = await applicationService.list();
      setRows(data.map((row) => ({ ...row, id: buildId(row, ["applicationId"]) })));
    }

    load();
  }, [user]);

  return (
    <EntityListPage
      eyebrow="PAA"
      title="Applications"
      description="Monitor submitted card applications and their current lifecycle state."
      addPath="/paa/applications/add"
      basePath="/paa/applications"
      showAdd={canCreateApplication(user?.role)}
      showEdit={canManageApplications(user?.role)}
      searchFields={["applicationId", "customerId", "productId", "status"]}
      rows={rows}
      columns={[
        { key: "applicationId", label: "Application ID" },
        { key: "customerId", label: "Customer ID" },
        { key: "productId", label: "Product ID" },
        { key: "requestedLimit", label: "Requested Limit", render: (row) => currency(row.requestedLimit) },
        { key: "applicationDate", label: "Date", render: (row) => date(row.applicationDate) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
