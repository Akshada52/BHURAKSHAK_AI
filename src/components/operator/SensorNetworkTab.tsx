import { Radio, Wifi, Battery, Network } from "lucide-react";
import { demoOperatorCoverage } from "@/data/operatorMocks";
import { SensorNetworkGraph } from "@/components/gis/SensorNetworkGraph";

export function SensorNetworkTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)] overflow-auto pb-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Sensor Network Health</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time status of surface nodes and gateways</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-muted-foreground">
            <Radio className="size-5" />
            <span className="font-semibold text-sm uppercase tracking-wider">Total Nodes</span>
          </div>
          <span className="text-3xl font-bold font-mono">{demoOperatorCoverage.totalSensors}</span>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm border-l-4 border-l-safe">
          <div className="flex items-center gap-3 mb-2 text-safe">
            <Wifi className="size-5" />
            <span className="font-semibold text-sm uppercase tracking-wider">Online & Healthy</span>
          </div>
          <span className="text-3xl font-bold font-mono text-safe">{demoOperatorCoverage.activeSensors}</span>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm border-l-4 border-l-warning">
          <div className="flex items-center gap-3 mb-2 text-warning">
            <Battery className="size-5" />
            <span className="font-semibold text-sm uppercase tracking-wider">Low Battery</span>
          </div>
          <span className="text-3xl font-bold font-mono text-warning">{demoOperatorCoverage.lowBattery}</span>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm border-l-4 border-l-caution">
          <div className="flex items-center gap-3 mb-2 text-caution">
            <Network className="size-5" />
            <span className="font-semibold text-sm uppercase tracking-wider">Weak Signal</span>
          </div>
          <span className="text-3xl font-bold font-mono text-caution">{demoOperatorCoverage.weakSignal}</span>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm flex-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Network Topology</h3>
        <SensorNetworkGraph />
      </div>
    </div>
  );
}
