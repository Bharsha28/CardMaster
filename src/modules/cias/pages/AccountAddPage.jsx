import EntityFormPage from "../../../shared/components/EntityFormPage";
import accountService from "../services/accountService";

export default function AccountAddPage() {
  return (
    <EntityFormPage
      eyebrow="CIAS"
      title="Create Account"
      description="Open a card account linked to an issued card."
      initialValues={{ cardId: "" }}
      successPath="/cias/accounts"
      onSubmit={accountService.create}
      fields={[{ name: "cardId", label: "Card ID", type: "number" }]}
    />
  );
}
