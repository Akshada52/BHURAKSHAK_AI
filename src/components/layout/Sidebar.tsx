import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import type { UserRole } from "@/types";
import { getRole } from "@/data";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  id: string;
}

export function Sidebar({
  role,
  items,
  activeTab,
  onTabChange,
}: {
  role: UserRole;
  items: NavItem[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}) {
  const definition = getRole(role);
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="border-b border-sidebar-border px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
          Workspace
        </p>
        <p className="mt-1 text-sm font-semibold">{definition.title}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const isActive = activeTab ? activeTab === item.id : false;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="size-4" aria-hidden />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/system"
          className="flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <LayoutGrid className="size-4" aria-hidden />
          Switch role
        </Link>
      </div>
    </aside>
  );
}
