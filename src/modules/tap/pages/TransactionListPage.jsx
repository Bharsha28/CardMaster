import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { useAuth } from "../../../context/AuthContext";
import { currency, dateTime } from "../../../shared/utils/formatters";
import { canAuthorizeTransactions, canPostTransactions } from "../../../shared/utils/access";
import transactionService from "../services/transactionService";

export default function TransactionListPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    transactionService.list().then((data) => setRows(data.map((row) => ({ ...row, id: row.transactionId }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="TAP"
      title="Transactions"
      description="Authorization, posting, and reversal activity."
      addPath="/tap/transactions/add"
      basePath="/tap/transactions"
      showAdd={canAuthorizeTransactions(user?.role)}
      showEdit={canPostTransactions(user?.role)}
      searchFields={["transactionId", "merchant", "status", "channel"]}
      rows={rows}
      columns={[
        { key: "transactionId", label: "Transaction ID" },
        { key: "accountId", label: "Account ID" },
        { key: "merchant", label: "Merchant" },
        { key: "amount", label: "Amount", render: (row) => currency(row.amount) },
        { key: "channel", label: "Channel" },
        { key: "transactionDate", label: "Date", render: (row) => dateTime(row.transactionDate) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
