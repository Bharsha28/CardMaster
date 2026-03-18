import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { currency } from "../../../shared/utils/formatters";
import { buildId } from "../../../shared/utils/apiResponse";
import customerService from "../services/customerService";

export default function CustomerListPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    customerService.list().then((data) => setRows(data.map((row) => ({ ...row, id: buildId(row, ["customerId"]) }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="PAA"
      title="Customers"
      description="Customer master data available to profile and application workflows."
      addPath="/paa/customers/add"
      basePath="/paa/customers"
      searchFields={["name", "status", "employmentType"]}
      rows={rows}
      columns={[
        { key: "customerId", label: "Customer ID" },
        { key: "name", label: "Name" },
        { key: "employmentType", label: "Employment" },
        { key: "income", label: "Income", render: (row) => currency(row.income) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
