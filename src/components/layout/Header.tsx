import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Header({ right, className }: { right?: ReactNode; className?: string }) {
  return (
    <header className={cn("border-b border-sidebar-border bg-navy text-navy-foreground", className)}>
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-sm bg-saffron text-saffron-foreground">
            <Mountain className="size-4" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-[0.18em]">BHURAKSHAK</span>
            <span className="block text-[10px] uppercase tracking-[0.14em] text-navy-foreground/70">
              Mine subsidence early warning
            </span>
          </span>
        </Link>
        <span className="hidden rounded-sm border border-navy-foreground/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-foreground/80 md:inline">
          Prototype · demo data
        </span>
        <div className="ml-auto flex items-center gap-3">{right}</div>
      </div>
    </header>
  );
}
