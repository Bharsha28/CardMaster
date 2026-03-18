import { useEffect, useState } from "react";
import EntityListPage from "../../../shared/components/EntityListPage";
import { titleCase } from "../../../shared/utils/formatters";
import { buildId } from "../../../shared/utils/apiResponse";
import userService from "../services/userService";

export default function UserListPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    userService.list().then((data) => setRows(data.map((row) => ({ ...row, id: buildId(row, ["userId"]) }))));
  }, []);

  return (
    <EntityListPage
      eyebrow="IAM"
      title="User Directory"
      description="Manage staff and customer identities that can authenticate against the backend."
      addPath="/iam/users/add"
      basePath="/iam/users"
      searchFields={["name", "email", "phone", "role"]}
      rows={rows}
      columns={[
        { key: "userId", label: "User ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "role", label: "Role", render: (row) => titleCase(row.role) },
      ]}
    />
  );
}
