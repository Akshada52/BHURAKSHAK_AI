import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div 
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md group", className)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Icon className="size-4" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-extrabold text-foreground tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold text-muted-foreground">{unit}</span>}
      </div>
      {(hint || trend) && (
        <div className="mt-3 text-xs font-medium text-muted-foreground">
          {trend ? (
            <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]", 
              trend.direction === "up" ? "bg-warning/10 text-warning" : 
              trend.direction === "down" ? "bg-safe/10 text-safe" : "bg-muted"
            )}>
              {trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "■"} {trend.text}
            </span>
          ) : hint}
        </div>
      )}
    </motion.div>
  );
}
