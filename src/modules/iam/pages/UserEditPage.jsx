import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import userService from "../services/userService";

export default function UserEditPage() {
  const { userId } = useParams();

  return (
    <EntityFormPage
      eyebrow="IAM"
      title={`Review User ${userId}`}
      description="The backend currently exposes user registration and fetch endpoints, but not a user update endpoint."
      notice="This page is intentionally read-only from an API perspective. It shows what would be edited once the backend adds a PUT /users/{id} endpoint."
      initialValues={{ name: "", email: "", phone: "", role: "" }}
      loadValues={() => userService.getById(userId)}
      successPath="/iam/users"
      submitLabel="Save Later"
      onSubmit={async () => Promise.resolve()}
      fields={[
        { name: "name", label: "Full Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone" },
        { name: "role", label: "Role" },
      ]}
    />
  );
}
