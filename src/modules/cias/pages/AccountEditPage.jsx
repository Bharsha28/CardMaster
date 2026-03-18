import { useParams } from "react-router-dom";
import EntityFormPage from "../../../shared/components/EntityFormPage";
import accountService from "../services/accountService";

export default function AccountEditPage() {
  const { accountId } = useParams();

  return (
    <EntityFormPage
      eyebrow="CIAS"
      title={`Use Card on Account ${accountId}`}
      description="The current operational account update action is to consume available limit via the use-card API."
      initialValues={{ amount: "" }}
      successPath="/cias/accounts"
      submitLabel="Apply Usage"
      onSubmit={(payload) => accountService.useCard(accountId, payload.amount)}
      fields={[{ name: "amount", label: "Usage Amount", type: "number" }]}
    />
  );
}
