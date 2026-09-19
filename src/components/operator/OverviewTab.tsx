import { Activity, Bell, Radio, Map, ShieldAlert, Wifi, Clock, AlertTriangle } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { MapContainer } from "@/components/common/Panels";
import { demoOperatorCoverage, demoOperatorAlerts } from "@/data/operatorMocks";
import { MapCore } from "@/components/gis/MapCore";

export function OverviewTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Current Mine Risk" value="WATCH" icon={AlertTriangle} hint="Panel P-12 elevated" valueClassName="text-warning" />
        <KpiCard label="Active Warnings" value={demoOperatorAlerts.filter((a) => a.severity === "warning").length} icon={Bell} hint="Requires acknowledgment" valueClassName="text-warning" />
        <KpiCard label="High-Risk Zones" value="1" icon={ShieldAlert} hint="Zone Z-04" valueClassName="text-critical" />
        <KpiCard label="Latest Alert" value="12 mins ago" icon={Clock} hint="Panel P-12, Zone Z-04" />
        <KpiCard label="Sensors Online" value={demoOperatorCoverage.activeSensors} icon={Radio} hint="100% active" valueClassName="text-safe" />
        <KpiCard label="Sensors Offline" value={demoOperatorCoverage.offlineSensors} icon={Radio} hint="0 nodes down" />
        <KpiCard label="Network Health" value="99.8%" icon={Wifi} hint="Stable connection" valueClassName="text-safe" />
        <KpiCard label="Last Data Sync" value="Just now" icon={Activity} hint="Live stream active" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <MapContainer
          className="lg:col-span-3 min-h-[500px]"
          title="Mine Overview"
          description="GIS Map showing live node statuses, risk zones, and structural bounds."
        >
          <MapCore />
        </MapContainer>
      </div>
    </div>
  );
}
