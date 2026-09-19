import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: LucideIcon;
  trend?: { direction: "up" | "down" | "flat"; text: string };
  className?: string;
}

export function KpiCard({ label, value, unit, hint, icon: Icon, trend, className }: KpiCardProps) {
  return (
    <div className={cn("rounded-md border bg-card p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="label-caps">{label}</span>
        {Icon && <Icon className="size-4 text-muted-foreground" aria-hidden />}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="numeric-readout text-3xl font-semibold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {(hint || trend) && (
        <p className="mt-2 text-xs text-muted-foreground">
          {trend ? `${trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "■"} ${trend.text}` : hint}
        </p>
      )}
    </div>
  );
}
