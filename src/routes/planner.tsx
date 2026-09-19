import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, LineChart, Layers, Map, Target } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCard } from "@/components/common/KpiCard";
import { ChartContainer, MapContainer } from "@/components/common/Panels";
import { demoCoverage, demoDeformationTrend, demoPanels } from "@/data";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Planner workspace — BHURAKSHAK" },
      {
        name: "description",
        content: "Deformation trends, predicted subsidence envelopes and panel sequencing analysis.",
      },
      { property: "og:title", content: "Planner workspace — BHURAKSHAK" },
      {
        property: "og:description",
        content: "Deformation trends, predicted subsidence envelopes and panel sequencing analysis.",
      },
    ],
  }),
  component: PlannerPage,
});

const nav = [
  { id: "trends", label: "Deformation trends", icon: LineChart },
  { id: "panels", label: "Panels", icon: Layers },
  { id: "prediction", label: "Prediction", icon: Target },
  { id: "coverage", label: "Coverage", icon: Map },
  { id: "sequence", label: "Extraction plan", icon: CalendarRange },
];

function PlannerPage() {
  const latest = demoDeformationTrend.series.at(-1)!;
  return (
    <DashboardShell
      role="planner"
      nav={nav}
      title="Planning and prediction"
      subtitle="Demo Colliery Alpha · synthetic demo data"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Panels tracked" value={demoPanels.length} icon={Layers} hint="Active and planned" />
        <KpiCard label="Cumulative subsidence" value={latest.value} unit="mm" icon={LineChart} hint="Panel A1 · demo trend" />
        <KpiCard label="Coverage" value={Math.round((demoCoverage.monitoredAreaKm2 / demoCoverage.totalAreaKm2) * 100)} unit="%" icon={Map} hint="Instrumented surface area" />
        <KpiCard label="Prediction horizon" value={7} unit="days" icon={Target} hint="Demo configuration" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <ChartContainer
          className="lg:col-span-2"
          title="Subsidence trend vs prediction"
          description="Chart layer arrives in a later stage"
          height={300}
        />
        <MapContainer title="Panel geometry" description="Predicted envelopes overlay later" height={300} />
      </div>
    </DashboardShell>
  );
}
