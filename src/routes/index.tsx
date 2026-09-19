import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CircleDollarSign,
  Crosshair,
  Eye,
  GitCompareArrows,
  HeartPulse,
  Map,
  Mountain,
  Radar,
  Satellite,
  ShieldAlert,
  Wifi,
  WifiOff,
} from "lucide-react";
import { HeroVisual } from "@/components/landing/HeroVisual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BhuRakshak — AI-Enabled Mine Subsidence Monitoring & Early Warning" },
      {
        name: "description",
        content:
          "AI-enabled, low-cost surface sensor network for continuous mine deformation monitoring, risk assessment and early warning in underground coal mines. SIH26025, Ministry of Coal.",
      },
      {
        property: "og:title",
        content: "BhuRakshak — AI-Enabled Mine Subsidence Monitoring & Early Warning",
      },
      {
        property: "og:description",
        content:
          "Real-time ground intelligence for underground coal mining: distributed surface sensing, risk assessment and evidence-based early warning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/* ------------------------------ content ------------------------------ */

const workflow = [
  {
    step: "01",
    title: "SENSE",
    icon: Radar,
    text: "Distributed surface nodes observe ground behaviour above active workings.",
  },
  {
    step: "02",
    title: "VALIDATE",
    icon: HeartPulse,
    text: "Check sensor health and data quality before any reading is trusted.",
  },
  {
    step: "03",
    title: "CORRELATE",
    icon: GitCompareArrows,
    text: "Compare neighbouring sensors and temporal trends to separate signal from noise.",
  },
  {
    step: "04",
    title: "ASSESS",
    icon: Activity,
    text: "Generate zone-wise risk intelligence with confidence and contributing drivers.",
  },
  {
    step: "05",
    title: "WARN",
    icon: ShieldAlert,
    text: "Provide evidence-based alerts that carry the signals behind them.",
  },
];

const whyCards = [
  { title: "REAL-TIME", icon: Satellite, text: "Continuous surface monitoring over active panels." },
  { title: "LOW-COST", icon: CircleDollarSign, text: "Distributed low-cost sensing, deployable at mine scale." },
  { title: "AI-ENABLED", icon: BrainCircuit, text: "Anomaly and trend analysis on every incoming stream." },
  { title: "SPATIAL", icon: Crosshair, text: "Neighbouring sensor corroboration before risk is raised." },
  { title: "OFFLINE-RESILIENT", icon: WifiOff, text: "Local buffering and edge intelligence when links drop." },
  { title: "GIS-BASED", icon: Map, text: "Location-specific risk visualisation over panel geometry." },
];

const roleViews = [
  {
    title: "MINE OPERATOR",
    tagline: "ACT NOW",
    text: "Live ground conditions, active alerts and immediate response actions for the shift in charge.",
    route: "/operator" as const,
  },
  {
    title: "MINE PLANNER",
    tagline: "PLAN AHEAD",
    text: "Deformation trends and predicted subsidence behaviour to sequence extraction responsibly.",
    route: "/planner" as const,
  },
  {
    title: "REGULATOR",
    tagline: "OVERSEE",
    text: "Evidence trails behind every alert and a cross-mine view of monitoring posture.",
    route: "/regulator" as const,
  },
];

const chain = [
  "SURFACE SENSOR NETWORK",
  "WIRELESS NETWORK",
  "EDGE GATEWAY",
  "AI + RISK ENGINE",
  "GIS",
  "EARLY WARNING",
  "THREE DECISION VIEWS",
];

/* ------------------------------ page ------------------------------ */

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== Government-style header ===== */}
      <header className="border-b border-sidebar-border bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Government of India</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-navy-foreground/65">
              Ministry of Coal
            </p>
          </div>
          <Link to="/" className="flex items-center gap-2.5 justify-self-center">
            <span className="flex size-8 items-center justify-center rounded-sm bg-saffron text-saffron-foreground">
              <Mountain className="size-4" aria-hidden />
            </span>
            <span className="font-display text-base font-bold tracking-[0.22em]">BHURAKSHAK</span>
          </Link>
          <div className="hidden justify-self-end text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-navy-foreground/70 sm:block">
            <p>Smart Mining</p>
            <p>Mine Safety</p>
            <p>Digital Monitoring</p>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="border-b bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-sm border border-saffron/40 bg-saffron/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-saffron">
              <span>Smart India Hackathon 2026</span>
              <span className="text-navy-foreground/40">·</span>
              <span>SIH26025</span>
              <span className="text-navy-foreground/40">·</span>
              <span>Ministry of Coal</span>
            </p>
            <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Making Underground Coal Mining Safer Through Real-Time Ground Intelligence
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-navy-foreground/80 sm:text-base">
              An AI-enabled, low-cost surface sensor network for continuous mine deformation
              monitoring, risk assessment and early warning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/system"
                className="inline-flex items-center gap-2 rounded-sm bg-saffron px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-saffron-foreground transition-colors hover:bg-saffron/90"
              >
                Proceed to BhuRakshak
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-navy-foreground/30 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                How the system works
              </a>
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.12em] text-navy-foreground/50">
              Prototype / demonstration environment — synthetic data only
            </p>
          </div>
          <div className="rounded-md border border-navy-foreground/20 bg-navy-foreground/5 p-4 sm:p-6">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ===== Section 1 ===== */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-navy">The problem and the approach</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold sm:text-3xl">
            FROM GROUND MOVEMENT TO EARLY WARNING
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Underground extraction can alter ground behaviour. As coal is removed, the overlying
              strata redistribute load — and the surface above active workings can begin to move.
              Left unobserved, that movement threatens men, machinery and surface structures.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              BhuRakshak continuously observes surface deformation-related signals through a
              distributed sensor network and converts them into spatial and temporal risk
              intelligence — giving operators, planners and regulators time to act. The system
              indicates changing risk; it does not claim to predict exact collapse events.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section 2: workflow ===== */}
      <section id="how-it-works" className="scroll-mt-8 border-b bg-surface-panel">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-navy">System workflow</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">FIVE STEPS FROM SIGNAL TO WARNING</h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map((step) => (
              <li key={step.step} className="flex flex-col bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="numeric-readout text-2xl font-semibold text-navy/30">
                    {step.step}
                  </span>
                  <step.icon className="size-5 text-saffron" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold tracking-[0.14em]">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Section 3: why ===== */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-navy">Design principles</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">WHY BHURAKSHAK?</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card) => (
              <div key={card.title} className="bg-card p-6">
                <card.icon className="size-5 text-navy" aria-hidden />
                <h3 className="mt-4 font-display text-sm font-bold tracking-[0.14em]">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4: three decision views ===== */}
      <section className="border-b bg-navy text-navy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-saffron">Role-based intelligence</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold sm:text-3xl">
            ONE INTELLIGENCE LAYER. THREE DECISION VIEWS.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {roleViews.map((role) => (
              <Link
                key={role.title}
                to={role.route}
                className="group flex flex-col rounded-md border border-navy-foreground/20 bg-navy-foreground/5 p-6 transition-colors hover:border-saffron/60 hover:bg-navy-foreground/10"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-saffron">
                  {role.tagline}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold tracking-[0.1em]">{role.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-foreground/75">
                  {role.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy-foreground/60 transition-colors group-hover:text-saffron">
                  Open view
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 5: architecture chain ===== */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="label-caps text-navy">System architecture</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">THE INTELLIGENCE CHAIN</h2>
          <ol className="mx-auto mt-10 flex max-w-md flex-col items-center">
            {chain.map((stage, i) => (
              <li key={stage} className="flex w-full flex-col items-center">
                <div className="flex w-full items-center gap-3 rounded-sm border bg-card px-4 py-3">
                  <span className="numeric-readout text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xs font-bold tracking-[0.14em]">{stage}</span>
                  {i === chain.length - 1 && (
                    <Wifi className="ml-auto size-4 text-safe" aria-hidden />
                  )}
                </div>
                {i < chain.length - 1 && (
                  <span className="py-1 text-muted-foreground" aria-hidden>
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-charcoal text-navy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-sm bg-saffron text-saffron-foreground">
              <Mountain className="size-4" aria-hidden />
            </span>
            <span className="font-display text-base font-bold tracking-[0.22em]">BHURAKSHAK</span>
          </div>
          <p className="mt-3 text-sm text-navy-foreground/80">
            AI-Enabled Mine Subsidence Monitoring &amp; Early Warning
          </p>
          <div className="mt-6 border-t border-navy-foreground/15 pt-6 text-xs leading-relaxed text-navy-foreground/60">
            <p>Smart India Hackathon 2026 · SIH26025</p>
            <p>Ministry of Coal / Coal India Limited</p>
            <p className="mt-3 uppercase tracking-[0.12em]">
              Prototype / Demonstration Environment
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
