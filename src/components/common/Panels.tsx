import type { ReactNode } from "react";
import { Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPanelProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

function SectionPanel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: SectionPanelProps) {
  return (
    <section className={cn("rounded-md border bg-card", className)}>
      <header className="flex items-start gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </header>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

/** Wrapper for charts (Recharts/ECharts plug in later). */
export function ChartContainer({
  title,
  description,
  actions,
  children,
  height = 260,
  className,
}: Omit<SectionPanelProps, "bodyClassName"> & { height?: number }) {
  return (
    <SectionPanel title={title} description={description} actions={actions} className={className}>
      <div style={{ minHeight: height }} className="w-full">
        {children ?? <Placeholder text="Chart renders here" />}
      </div>
    </SectionPanel>
  );
}

/** Wrapper for the GIS surface (MapLibre GL mounts here in a later stage). */
export function MapContainer({
  title = "Geospatial view",
  description,
  actions,
  children,
  height = 420,
  className,
}: Partial<SectionPanelProps> & { height?: number }) {
  return (
    <SectionPanel
      title={title}
      description={description}
      actions={actions}
      className={className}
      bodyClassName="p-0"
    >
      <div
        style={{ minHeight: height }}
        className="relative w-full overflow-hidden rounded-b-md bg-[repeating-linear-gradient(45deg,var(--color-muted)_0_12px,transparent_12px_24px)]"
      >
        {children ?? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <MapIcon className="size-5" aria-hidden />
            <p className="text-xs">Map layer mounts here</p>
          </div>
        )}
      </div>
    </SectionPanel>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex h-full min-h-40 items-center justify-center rounded-sm border border-dashed text-xs text-muted-foreground">
      {text}
    </div>
  );
}

export { SectionPanel };
