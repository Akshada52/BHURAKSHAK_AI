import { useState } from "react";
import { Activity, X, Battery, Wifi, Cpu, MapPin, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { demoSensors } from "@/data/operatorMocks";

export function LiveMonitoringTab() {
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  const activeSensor = selectedSensor ? demoSensors.find((s) => s.id === selectedSensor) : null;

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Table Container */}
      <div className={`flex-1 overflow-auto rounded-xl border bg-card p-4 shadow-sm ${selectedSensor ? 'hidden lg:block' : ''}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Live Sensor Network</h2>
          <span className="text-xs text-muted-foreground">{demoSensors.length} active nodes</span>
        </div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-left">
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Sensor ID</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Location</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Tilt (mm/m)</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Vibration (mm/s)</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Strain (με)</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Battery</th>
                <th className="h-10 px-2 align-middle font-medium text-muted-foreground">Signal</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {demoSensors.map((sensor) => (
                <tr
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor.id)}
                  className="cursor-pointer border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-2 align-middle font-mono font-medium">{sensor.id}</td>
                  <td className="p-2 align-middle">{sensor.location}</td>
                  <td className="p-2 align-middle">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      sensor.status === 'warning' ? 'bg-warning/20 text-warning' : 
                      sensor.status === 'watch' ? 'bg-caution/20 text-caution' : 
                      'bg-safe/20 text-safe'
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="p-2 align-middle font-mono">{sensor.tilt}</td>
                  <td className="p-2 align-middle font-mono">{sensor.vibration}</td>
                  <td className="p-2 align-middle font-mono">{sensor.strain}</td>
                  <td className="p-2 align-middle font-mono">{sensor.battery}%</td>
                  <td className="p-2 align-middle font-mono">{sensor.signal}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Side Panel */}
      {activeSensor && (
        <div className="w-full md:w-96 shrink-0 rounded-xl border bg-card p-4 shadow-sm overflow-auto animate-in slide-in-from-right-8 duration-300">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h3 className="text-xl font-bold font-mono text-foreground">{activeSensor.id}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="size-3" /> {activeSensor.location}
              </p>
            </div>
            <button onClick={() => setSelectedSensor(null)} className="p-2 hover:bg-muted rounded-md transition-colors">
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">Status</div>
                <div className={`font-bold uppercase ${
                  activeSensor.status === 'warning' ? 'text-warning' : 
                  activeSensor.status === 'watch' ? 'text-caution' : 
                  'text-safe'
                }`}>
                  {activeSensor.status}
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">Last Update</div>
                <div className="font-bold">{activeSensor.lastUpdate}</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Readings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded bg-background border">
                  <span className="text-sm">Tilt</span>
                  <span className="font-mono font-bold">{activeSensor.tilt} <span className="text-xs text-muted-foreground font-sans font-normal">mm/m</span></span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-background border">
                  <span className="text-sm">Tilt Rate</span>
                  <span className="font-mono font-bold">{activeSensor.tiltRate} <span className="text-xs text-muted-foreground font-sans font-normal">mm/m/hr</span></span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-background border">
                  <span className="text-sm">Vibration</span>
                  <span className="font-mono font-bold">{activeSensor.vibration} <span className="text-xs text-muted-foreground font-sans font-normal">mm/s</span></span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-background border">
                  <span className="text-sm">Displacement/Strain</span>
                  <span className="font-mono font-bold">{activeSensor.strain} <span className="text-xs text-muted-foreground font-sans font-normal">με</span></span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Device Health</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1 p-2 rounded bg-background border">
                  <Battery className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Battery</span>
                  <span className="font-mono font-bold">{activeSensor.battery}%</span>
                </div>
                <div className="flex flex-col gap-1 p-2 rounded bg-background border">
                  <Wifi className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Signal</span>
                  <span className="font-mono font-bold">{activeSensor.signal}%</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-surface-panel p-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <Activity className="size-4 text-saffron" />
                AI Anomaly Score
              </h4>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold font-mono">
                  {activeSensor.status === 'warning' ? '87' : activeSensor.status === 'watch' ? '45' : '12'}
                </span>
                <span className="text-xs text-muted-foreground mb-1">/ 100</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {activeSensor.status === 'warning' ? 'High anomaly detected in tilt rate.' : 'Normal baseline behaviour.'}
              </p>
            </div>
            
            <button className="w-full rounded bg-muted py-2 text-sm font-medium hover:bg-muted/80 transition-colors">
              View Historical Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
