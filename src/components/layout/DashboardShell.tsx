import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { demoSystemStatus, getRole } from "@/data";
import { Header } from "./Header";
import { Sidebar, type NavItem } from "./Sidebar";
import { SystemStatus } from "@/components/common/SystemStatus";

export function DashboardShell({
  role,
  nav,
  title,
  subtitle,
  children,
}: {
  role: UserRole;
  nav: NavItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const definition = getRole(role);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        right={
          <span className="text-xs uppercase tracking-[0.12em] text-navy-foreground/80">
            {definition.title}
          </span>
        }
      />
      <div className="flex flex-1">
        <Sidebar role={role} items={nav} />
        <main className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 border-b bg-surface-panel px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <SystemStatus status={demoSystemStatus} compact className="ml-auto" />
          </div>
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
