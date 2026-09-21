import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: LucideIcon;
  iconColor?: string;   // e.g. "#3b82f6"
  iconBg?: string;      // e.g. "#eff6ff"
  trend?: { direction: "up" | "down" | "flat"; text: string };
  className?: string;
  valueClassName?: string;
}

export function KpiCard({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
  className,
  valueClassName,
}: KpiCardProps) {
  const ic = iconColor ?? "#3b82f6";
  const ib = iconBg ?? ic + "1a";

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow",
        className
      )}
    >
      {/* Icon box */}
      {Icon && (
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: ib }}
        >
          <Icon className="size-6" style={{ color: ic }} aria-hidden />
        </div>
      )}

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 truncate">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span
            className={cn(
              "font-mono text-2xl font-extrabold text-gray-800 tracking-tight",
              valueClassName
            )}
          >
            {value}
          </span>
          {unit && <span className="text-sm font-semibold text-gray-400">{unit}</span>}
        </div>
        {(hint || trend) && (
          <div className="mt-1 text-xs text-gray-400">
            {trend ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]",
                  trend.direction === "up"
                    ? "bg-amber-50 text-amber-600"
                    : trend.direction === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "■"} {trend.text}
              </span>
            ) : (
              hint
            )}
          </div>
        )}
      </div>
    </div>
  );
}
