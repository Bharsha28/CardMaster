import { useEffect, useState } from "react";
import AppShell from "../../../shared/components/AppShell";
import PageHeader from "../../../shared/components/PageHeader";
import UnderwriterDashboard from "../components/UnderwriterDashboard";
import underwritingService from "../services/underwritingService";

export default function UnderwriterDashboardPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    underwritingService.listApplications().then(setApplications);
  }, []);

  return (
    <AppShell>
      <PageHeader
        eyebrow="CAU Dashboard"
        title="Underwriter Dashboard"
        description="Review pipeline health and jump into application scoring."
      />
      <UnderwriterDashboard applications={applications} />
    </AppShell>
  );
}
