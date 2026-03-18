import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { useAuth } from "../../../context/AuthContext";
import { currency, date } from "../../../shared/utils/formatters";
import { canGenerateStatements } from "../../../shared/utils/access";
import statementService from "../services/statementService";

export default function StatementListPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    statementService.list().then((data) => setRows(data.map((row) => ({ ...row, id: row.statementId }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="BSP"
      title="Statements"
      description="Billing cycle statements for card accounts."
      addPath="/bsp/statements/add"
      basePath="/bsp/statements"
      showAdd={canGenerateStatements(user?.role)}
      showEdit={canGenerateStatements(user?.role)}
      searchFields={["statementId", "accountId", "status"]}
      rows={rows}
      columns={[
        { key: "statementId", label: "Statement ID" },
        { key: "accountId", label: "Account ID" },
        { key: "periodStart", label: "Start", render: (row) => date(row.periodStart) },
        { key: "periodEnd", label: "End", render: (row) => date(row.periodEnd) },
        { key: "totalDue", label: "Total Due", render: (row) => currency(row.totalDue) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
