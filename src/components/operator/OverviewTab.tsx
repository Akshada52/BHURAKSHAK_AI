import { Activity, Bell, Radio, ShieldAlert, Wifi, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { MapContainer } from "@/components/common/Panels";
import { demoOperatorCoverage, demoOperatorAlerts, demoSensors } from "@/data/operatorMocks";
import { MapCore } from "@/components/gis/MapCore";

const severityBadge: Record<string, string> = {
  warning: "bg-red-100 text-red-700",
  watch: "bg-amber-100 text-amber-700",
  normal: "bg-green-100 text-green-700",
};

const statusBadge: Record<string, string> = {
  open: "bg-red-100 text-red-700",
  acknowledged: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

export function OverviewTab() {
  const topSensors = demoSensors.slice(0, 8);

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Current Mine Risk"
          value="WATCH"
          icon={AlertTriangle}
          hint="Panel P-12 elevated"
          iconColor="#f59e0b"
          iconBg="#fffbeb"
          valueClassName="text-amber-600"
        />
        <KpiCard
          label="Active Warnings"
          value={demoOperatorAlerts.filter((a) => a.severity === "warning").length}
          icon={Bell}
          hint="Requires acknowledgment"
          iconColor="#ef4444"
          iconBg="#fef2f2"
          valueClassName="text-red-600"
        />
        <KpiCard
          label="High-Risk Zones"
          value="1"
          icon={ShieldAlert}
          hint="Zone Z-04"
          iconColor="#ef4444"
          iconBg="#fef2f2"
          valueClassName="text-red-600"
        />
        <KpiCard
          label="Latest Alert"
          value="12 mins ago"
          icon={Clock}
          hint="Panel P-12, Zone Z-04"
          iconColor="#6366f1"
          iconBg="#eef2ff"
        />
        <KpiCard
          label="Sensors Online"
          value={demoOperatorCoverage.activeSensors}
          icon={Radio}
          hint="100% active"
          iconColor="#22c55e"
          iconBg="#f0fdf4"
          valueClassName="text-green-600"
        />
        <KpiCard
          label="Sensors Offline"
          value={demoOperatorCoverage.offlineSensors}
          icon={Radio}
          hint="0 nodes down"
          iconColor="#64748b"
          iconBg="#f8fafc"
        />
        <KpiCard
          label="Network Health"
          value="99.8%"
          icon={Wifi}
          hint="Stable connection"
          iconColor="#22c55e"
          iconBg="#f0fdf4"
          valueClassName="text-green-600"
        />
        <KpiCard
          label="Last Data Sync"
          value="Just now"
          icon={Activity}
          hint="Live stream active"
          iconColor="#3b82f6"
          iconBg="#eff6ff"
        />
      </div>

      {/* Map + Alerts row */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Map */}
        <div className="lg:col-span-2">
          <MapContainer
            title="Mine Overview"
            description="GIS Map showing live node statuses, risk zones, and structural bounds."
            className="min-h-[420px] bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <MapCore />
          </MapContainer>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Recent Alerts</h3>
            <span className="text-xs text-gray-400">{demoOperatorAlerts.length} total</span>
          </div>
          <div className="flex-1 divide-y divide-gray-100 overflow-auto">
            {demoOperatorAlerts.map((alert) => (
              <div key={alert.id} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400">{alert.id}</span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${severityBadge[alert.severity] ?? "bg-gray-100 text-gray-600"}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 leading-snug">{alert.title}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.location} · {alert.time}</p>
                <div className="mt-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${statusBadge[alert.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensor status table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Sensor Network Status</h3>
          <span className="text-xs text-gray-400">Showing 8 of {demoSensors.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 text-left">Node ID</th>
                <th className="px-5 py-3 text-left">Location</th>
                <th className="px-5 py-3 text-right">Tilt (°)</th>
                <th className="px-5 py-3 text-right">Vibration</th>
                <th className="px-5 py-3 text-right">Battery %</th>
                <th className="px-5 py-3 text-right">Signal %</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topSensors.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-semibold text-gray-700">{s.id}</td>
                  <td className="px-5 py-3 text-gray-600">{s.location}</td>
                  <td className="px-5 py-3 text-right font-mono text-gray-700">{s.tilt}</td>
                  <td className="px-5 py-3 text-right font-mono text-gray-700">{s.vibration}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`font-mono font-semibold ${Number(s.battery) < 20 ? "text-red-600" : "text-gray-700"}`}>
                      {s.battery}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-gray-700">{s.signal}%</td>
                  <td className="px-5 py-3 text-center">
                    {s.status === "normal" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-green-100 text-green-700">
                        <CheckCircle className="size-3" /> Normal
                      </span>
                    ) : s.status === "warning" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">
                        <XCircle className="size-3" /> Warning
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-700">
                        <AlertTriangle className="size-3" /> Watch
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
