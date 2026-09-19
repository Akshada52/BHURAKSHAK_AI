import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Gauge, Layers, Radio, ShieldAlert, Waves } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { SystemStatus } from "@/components/common/SystemStatus";
import { demoSystemStatus } from "@/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BHURAKSHAK — Mine Subsidence Early Warning System" },
      {
        name: "description",
        content:
          "Prototype surface-sensor monitoring, prediction and early warning platform for underground coal mine subsidence.",
      },
      { property: "og:title", content: "BHURAKSHAK — Mine Subsidence Early Warning System" },
      {
        property: "og:description",
        content:
          "Prototype surface-sensor monitoring, prediction and early warning platform for underground coal mine subsidence.",
      },
    ],
  }),
  component: Landing,
});

const pipeline = [
  { icon: Radio, title: "Surface sensor network", text: "Tilt, GNSS, extensometer and vibration nodes above active panels." },
  { icon: Activity, title: "Health & anomaly checks", text: "Validate every node before a reading is trusted." },
  { icon: Layers, title: "Spatial + temporal analysis", text: "Panel-wise movement compared across space and time." },
  { icon: Gauge, title: "Risk assessment", text: "Zones scored with confidence and contributing drivers." },
  { icon: Waves, title: "GIS visualisation", text: "Risk surfaces rendered over mine panel geometry." },
  { icon: ShieldAlert, title: "Evidence-based alerts", text: "Every alert carries the signals that produced it." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        right={
          <Link
            to="/system"
            className="rounded-sm bg-saffron px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-saffron-foreground"
          >
            Open system
          </Link>
        }
      />

      <section className="border-b bg-navy text-navy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-navy-foreground/70">
            SIH26025 · Ministry of Coal / Coal India Limited · Team INCYBIC 89
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            AI-enabled, low-cost real-time subsidence monitoring for underground coal mines
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-navy-foreground/80">
            BHURAKSHAK watches the ground surface above underground panels through a distributed
            sensor network, validates every reading, and turns movement into evidence-backed early
            warnings for three decision-making roles. This build is a prototype running on synthetic
            demo data.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/system"
              className="rounded-sm bg-saffron px-5 py-2.5 text-sm font-semibold text-saffron-foreground"
            >
              Select a role
            </Link>
            <span className="rounded-sm border border-navy-foreground/25 px-3 py-2 text-xs text-navy-foreground/75">
              No real mine, sensor or regulatory data is used
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-semibold">Monitoring pipeline</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Surface measurement to role-specific decision support.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pipeline.map((step, i) => (
            <div key={step.title} className="bg-card p-5">
              <div className="flex items-center gap-2.5">
                <step.icon className="size-4 text-navy" aria-hidden />
                <span className="numeric-readout text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t bg-surface-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <span>BHURAKSHAK prototype — demo data only.</span>
          <SystemStatus status={demoSystemStatus} compact className="ml-auto" />
        </div>
      </footer>
    </div>
  );
}
