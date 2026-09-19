import { Layers, Map, TrendingUp, AlertTriangle, ShieldAlert, Target } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { MapContainer } from "@/components/common/Panels";
import { plannerKpis } from "@/data/plannerMocks";
import { MapCore } from "@/components/gis/MapCore";

export function PlanningOverviewTab() {
  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] overflow-auto pb-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard label="Panels Monitored" value={plannerKpis.panelsMonitored} icon={Layers} hint="Active and sealed" />
        <KpiCard label="Monitoring Coverage" value={plannerKpis.coverage} unit="%" icon={Map} hint="Total mine surface" />
        <KpiCard label="Increasing Risk Panels" value={plannerKpis.panelsIncreasingRisk} icon={TrendingUp} hint="P-12 and P-11" valueClassName="text-warning" />
        <KpiCard label="Historical Alerts" value={plannerKpis.historicalAlerts} icon={AlertTriangle} hint="YTD Total" />
        <KpiCard label="Sensor Coverage Gaps" value={plannerKpis.sensorGaps} icon={ShieldAlert} hint="Identified unmonitored zones" valueClassName="text-caution" />
        <KpiCard label="Priority Review Areas" value={plannerKpis.priorityReviewAreas} icon={Target} hint="Action required" valueClassName="text-critical" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <MapContainer
          className="lg:col-span-3 min-h-[500px]"
          title="Strategic Mine Overview"
          description="Showing structural gaps and historical risk zones."
        >
          <MapCore initialLayers={{ sdn: false, hmn: false, vectors: true, heatmap: true }} />
        </MapContainer>
      </div>
    </div>
  );
}
