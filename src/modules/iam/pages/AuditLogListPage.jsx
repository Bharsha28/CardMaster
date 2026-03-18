import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import Table from "../../../shared/components/Table";
import { dateTime } from "../../../shared/utils/formatters";
import auditLogService from "../services/auditLogService";
import userService from "../services/userService";
import AdminDashboard from "../components/AdminDashboard";

export default function AuditLogListPage() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    auditLogService.list().then(setLogs);
    userService.list().then(setUsers);
  }, []);

  const rows = logs.map((log, index) => ({
    id: log.id || index,
    actor: log.user?.name || log.username || "-",
    action: log.action,
    resource: log.resource || log.description,
    timestamp: log.createdAt || log.timestamp,
  }));

  return (
    <AppShell>
      <PageHeader
        eyebrow="IAM"
        title="Audit Logs"
        description="Administrative trace of register, login, logout, and related events captured by the backend."
      />
      <AdminDashboard users={users} logs={logs} />
      <div style={{ height: 16 }} />
      <Table
        rows={rows}
        searchFields={["actor", "action", "resource"]}
        columns={[
          { key: "actor", label: "Actor" },
          { key: "action", label: "Action" },
          { key: "resource", label: "Resource" },
          { key: "timestamp", label: "Timestamp", render: (row) => dateTime(row.timestamp) },
        ]}
      />
    </AppShell>
  );
}
