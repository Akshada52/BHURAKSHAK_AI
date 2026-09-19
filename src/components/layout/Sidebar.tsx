import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import type { UserRole } from "@/types";
import { getRole } from "@/data";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Section id within the dashboard; routed sub-pages arrive later. */
  id: string;
}

export function Sidebar({ role, items }: { role: UserRole; items: NavItem[] }) {
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
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors ${
              i === 0
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="size-4" aria-hidden />
            {item.label}
          </button>
        ))}
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
