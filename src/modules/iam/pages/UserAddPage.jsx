import EntityFormPage from "../../../shared/components/EntityFormPage";
import userService from "../services/userService";

const roleOptions = ["CUSTOMER", "OFFICER", "UNDERWRITER", "RISK", "ADMIN"].map((role) => ({ value: role, label: role }));

export default function UserAddPage() {
  return (
    <EntityFormPage
      eyebrow="IAM"
      title="Register User"
      description="Create a backend user through the public registration endpoint."
      initialValues={{ name: "", email: "", phone: "", role: "", password: "" }}
      successPath="/iam/users"
      onSubmit={userService.create}
      fields={[
        { name: "name", label: "Full Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone" },
        { name: "role", label: "Role", type: "select", options: roleOptions },
        { name: "password", label: "Password", type: "password" },
      ]}
    />
  );
}
