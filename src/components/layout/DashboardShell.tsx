import type { ReactNode } from "react";
import type { UserRole } from "@/types";
import { demoSystemStatus, getRole } from "@/data";
import { Header } from "./Header";
import { Sidebar, type NavItem } from "./Sidebar";
import { SystemStatus } from "@/components/common/SystemStatus";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Mountain, Activity } from "lucide-react";

export function DashboardShell({
  role,
  nav,
  title,
  subtitle,
  children,
  activeTab,
  onTabChange,
}: {
  role: UserRole;
  nav: NavItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (id: string) => void;
}) {
  const definition = getRole(role);

  const getRoleTheme = (r: UserRole) => {
    switch (r) {
      case 'operator': return { border: 'border-b-critical/50', bg: 'bg-critical/5', icon: <Activity className="size-4 text-critical" /> };
      case 'planner': return { border: 'border-b-primary/50', bg: 'bg-primary/5', icon: <Mountain className="size-4 text-primary" /> };
      case 'regulator': return { border: 'border-b-purple-500/50', bg: 'bg-purple-500/5', icon: <ShieldAlert className="size-4 text-purple-500" /> };
      default: return { border: 'border-b-border', bg: 'bg-surface-panel', icon: null };
    }
  };

  const theme = getRoleTheme(role);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header
        right={
          <div className="flex items-center gap-3 bg-black/20 px-3 py-1 rounded">
            {theme.icon}
            <span className="text-xs uppercase font-bold tracking-widest text-white/90">
              {definition.title}
            </span>
          </div>
        }
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={role} items={nav} activeTab={activeTab} onTabChange={onTabChange} />
        <main className="min-w-0 flex-1 flex flex-col h-[calc(100vh-3.5rem)]">
          <div className={`flex flex-wrap items-center gap-3 border-b border-border ${theme.bg} ${theme.border} border-b-2 px-6 py-4 shadow-sm z-10 relative`}>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="text-sm font-medium text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            <SystemStatus status={demoSystemStatus} compact className="ml-auto" />
          </div>
          <div className="flex-1 overflow-hidden bg-muted/20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab || title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 p-6 overflow-auto"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
