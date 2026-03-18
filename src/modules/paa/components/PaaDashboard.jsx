import DashboardCards from "../../../shared/components/DashboardCards";

export default function PaaDashboard({ customers = [], applications = [], documents = [], role = "CUSTOMER" }) {
  return (
    <DashboardCards
      cards={[
        { label: role === "OFFICER" ? "Branch Customers" : "My Customers", value: customers.length, caption: "Profiles on file" },
        { label: "Applications", value: applications.length, caption: "Submitted and tracked" },
        {
          label: "Approval Rate",
          value: `${applications.length ? Math.round((applications.filter((item) => item.status === "APPROVED").length / applications.length) * 100) : 0}%`,
          caption: "Across visible applications",
        },
        { label: "Documents", value: documents.length, caption: "Uploaded document records" },
      ]}
    />
  );
}
