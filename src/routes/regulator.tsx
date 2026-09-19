import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, FileCheck2, Map, ShieldCheck, Building2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCard } from "@/components/common/KpiCard";
import { DataTable, type Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MapContainer } from "@/components/common/Panels";
import { demoAlerts, demoCoverage, demoMines } from "@/data";
import type { Alert } from "@/types";

export const Route = createFileRoute("/regulator")({
  head: () => ({
    meta: [
      { title: "Regulator workspace — BHURAKSHAK" },
      {
        name: "description",
        content: "Oversight view of monitoring coverage and evidence trails behind subsidence alerts.",
      },
      { property: "og:title", content: "Regulator workspace — BHURAKSHAK" },
      {
        property: "og:description",
        content: "Oversight view of monitoring coverage and evidence trails behind subsidence alerts.",
      },
    ],
  }),
  component: RegulatorPage,
});

const nav = [
  { id: "overview", label: "Oversight", icon: ShieldCheck },
  { id: "mines", label: "Mines", icon: Building2 },
  { id: "alerts", label: "Alert register", icon: ClipboardList },
  { id: "evidence", label: "Evidence trail", icon: FileCheck2 },
  { id: "map", label: "Regional map", icon: Map },
];

const columns: Column<Alert>[] = [
  { key: "id", header: "Reference", render: (a) => <span className="numeric-readout">{a.id}</span> },
  { key: "title", header: "Alert", render: (a) => a.title },
  {
    key: "severity",
    header: "Severity",
    render: (a) => <StatusBadge label={a.severity} tone={a.severity === "critical" ? "critical" : a.severity === "warning" ? "warning" : "caution"} />,
  },
  { key: "status", header: "Status", render: (a) => <StatusBadge label={a.status} tone="neutral" dot={false} /> },
  {
    key: "raised",
    header: "Raised",
    align: "right",
    render: (a) => <span className="numeric-readout text-xs">{new Date(a.raisedAt).toLocaleString()}</span>,
  },
];

function RegulatorPage() {
  return (
    <DashboardShell
      role="regulator"
      nav={nav}
      title="Regulatory oversight"
      subtitle="Prototype register · synthetic demo data, no official classifications"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Mines in view" value={demoMines.length} icon={Building2} hint="Demo registry" />
        <KpiCard label="Alerts on record" value={demoAlerts.length} icon={ClipboardList} hint="With evidence attached" />
        <KpiCard label="Monitoring coverage" value={Math.round((demoCoverage.monitoredAreaKm2 / demoCoverage.totalAreaKm2) * 100)} unit="%" icon={Map} />
        <KpiCard label="Data uptime" value={demoCoverage.dataUptimePct} unit="%" icon={ShieldCheck} hint="Last 24 hours" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable columns={columns} rows={demoAlerts} rowKey={(a) => a.id} />
        </div>
        <MapContainer title="Regional risk map" description="Cross-mine layer arrives later" height={300} />
      </div>
    </DashboardShell>
  );
}
