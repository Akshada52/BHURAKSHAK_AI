import { createFileRoute } from "@tanstack/react-router";
import { Activity, Bell, Gauge, Radio, Map } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCard } from "@/components/common/KpiCard";
import { MapContainer, ChartContainer } from "@/components/common/Panels";
import { AlertCard } from "@/components/common/AlertCard";
import { demoAlerts, demoCoverage } from "@/data";

export const Route = createFileRoute("/operator")({
  head: () => ({
    meta: [
      { title: "Operator workspace — BHURAKSHAK" },
      {
        name: "description",
        content: "Shift-level surface sensor monitoring and alert response for mine operators.",
      },
      { property: "og:title", content: "Operator workspace — BHURAKSHAK" },
      {
        property: "og:description",
        content: "Shift-level surface sensor monitoring and alert response for mine operators.",
      },
    ],
  }),
  component: OperatorPage,
});

const nav = [
  { id: "overview", label: "Live overview", icon: Gauge },
  { id: "sensors", label: "Sensor network", icon: Radio },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "map", label: "Site map", icon: Map },
  { id: "readings", label: "Readings", icon: Activity },
];

function OperatorPage() {
  return (
    <DashboardShell
      role="operator"
      nav={nav}
      title="Live operations overview"
      subtitle="Demo Colliery Alpha · synthetic demo data"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active sensors" value={`${demoCoverage.activeSensors}/${demoCoverage.totalSensors}`} icon={Radio} hint="Nodes reporting this hour" />
        <KpiCard label="Data uptime" value={demoCoverage.dataUptimePct} unit="%" icon={Activity} hint="Last 24 hours" />
        <KpiCard label="Open alerts" value={demoAlerts.filter((a) => a.status === "open").length} icon={Bell} hint="Awaiting acknowledgement" />
        <KpiCard label="Monitored area" value={demoCoverage.monitoredAreaKm2} unit="km²" icon={Map} hint={`of ${demoCoverage.totalAreaKm2} km² total`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <MapContainer
          className="lg:col-span-2"
          title="Surface sensor network"
          description="GIS layer arrives in a later stage"
        />
        <div className="space-y-4">
          <ChartContainer title="Ground movement" description="Panel A1 · placeholder" height={180} />
          <div className="space-y-3">
            {demoAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
