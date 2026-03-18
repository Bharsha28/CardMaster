import DashboardCards from "../../../shared/components/DashboardCards";

export default function UnderwriterDashboard({ applications = [] }) {
  return (
    <DashboardCards
      cards={[
        { label: "Pipeline", value: applications.length, caption: "Visible applications for assessment" },
        {
          label: "Submitted",
          value: applications.filter((item) => item.status === "SUBMITTED").length,
          caption: "Fresh applications waiting for scoring",
        },
        {
          label: "Approved",
          value: applications.filter((item) => item.status === "APPROVED").length,
          caption: "Applications marked approved",
        },
      ]}
    />
  );
}
