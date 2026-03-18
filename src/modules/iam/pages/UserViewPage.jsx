import { useParams } from "react-router-dom";
import EntityViewPage from "../../../shared/components/EntityViewPage";
import userService from "../services/userService";

export default function UserViewPage() {
  const { userId } = useParams();

  return (
    <EntityViewPage
      eyebrow="IAM"
      title={`User ${userId}`}
      description="Inspect the user profile as returned by the backend."
      loadData={() => userService.getById(userId)}
      fields={[
        { key: "userId", label: "User ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "role", label: "Role", format: "title" },
      ]}
    />
  );
}
