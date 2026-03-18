import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { useAuth } from "../../../context/AuthContext";
import { currency, dateTime } from "../../../shared/utils/formatters";
import { canCapturePayments } from "../../../shared/utils/access";
import paymentService from "../services/paymentService";

export default function PaymentListPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    paymentService.list().then((data) => setRows(data.map((row) => ({ ...row, id: row.paymentId }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="BSP"
      title="Payments"
      description="Captured payments across customer accounts."
      addPath="/bsp/payments/add"
      basePath="/bsp/payments"
      showAdd={canCapturePayments(user?.role)}
      showEdit={false}
      searchFields={["paymentId", "accountId", "statementId", "status"]}
      rows={rows}
      columns={[
        { key: "paymentId", label: "Payment ID" },
        { key: "accountId", label: "Account ID" },
        { key: "statementId", label: "Statement ID" },
        { key: "amount", label: "Amount", render: (row) => currency(row.amount) },
        { key: "paymentDate", label: "Payment Date", render: (row) => dateTime(row.paymentDate) },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
