import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { RoleCard } from "@/components/common/RoleCard";
import { SystemStatus } from "@/components/common/SystemStatus";
import { ROLES, demoSystemStatus } from "@/data";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "Role selection — BHURAKSHAK" },
      {
        name: "description",
        content: "Choose an operator, planner or regulator workspace in the BHURAKSHAK prototype.",
      },
      { property: "og:title", content: "Role selection — BHURAKSHAK" },
      {
        property: "og:description",
        content: "Choose an operator, planner or regulator workspace in the BHURAKSHAK prototype.",
      },
    ],
  }),
  component: SystemPage,
});

function SystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="label-caps">System access</p>
        <h1 className="mt-2 text-2xl font-semibold">Select your role</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each workspace surfaces the same validated sensor network through a different information
          hierarchy. Dashboards are built in the next stage.
        </p>
        <SystemStatus status={demoSystemStatus} className="mt-6" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </main>
    </div>
  );
}
