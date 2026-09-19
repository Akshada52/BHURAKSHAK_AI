import { X, MapPin, Activity, Battery, Wifi, Cpu, Clock } from "lucide-react";

interface NodeData {
  id: string;
  type: string;
  status: string;
  tilt: string;
  vibration: string;
  battery: number;
  signal: number;
}

interface NodeDetailPanelProps {
  node: NodeData;
  onClose: () => void;
}

export function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  const isHighRisk = node.status === 'WARNING' || node.status === 'HIGH RISK';
  const isCaution = node.status === 'WATCH';

  return (
    <div className="absolute top-4 right-4 w-80 bg-card rounded-xl shadow-lg border p-4 animate-in slide-in-from-right-4 duration-300 z-10 max-h-[calc(100%-2rem)] overflow-auto">
      <div className="flex justify-between items-start mb-4 pb-4 border-b">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              node.type === 'SDN' ? 'bg-blue-500/20 text-blue-500' :
              node.type === 'HMN' ? 'bg-purple-500/20 text-purple-500' :
              node.type === 'MEG' ? 'bg-amber-500/20 text-amber-500' :
              'bg-slate-500/20 text-slate-500'
            }`}>
              {node.type} Node
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isHighRisk ? 'bg-warning/20 text-warning' :
              isCaution ? 'bg-caution/20 text-caution' : 'bg-safe/20 text-safe'
            }`}>
              {node.status}
            </span>
          </div>
          <h3 className="font-mono font-bold text-lg">{node.id}</h3>
        </div>
        <button onClick={onClose} className="p-1 text-muted-foreground hover:bg-muted rounded">
          <X className="size-4" />
        </button>
      </div>

      <div className="space-y-4">
        {node.type !== 'GNSS' && node.type !== 'MEG' && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Activity className="size-3.5" /> Sensor Metrics <span className="text-[9px] bg-muted px-1 rounded">(DEMO)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted p-2 rounded">
                <span className="text-xs text-muted-foreground block">Tilt</span>
                <span className="font-mono font-bold">{node.tilt} mm/m</span>
              </div>
              <div className="bg-muted p-2 rounded">
                <span className="text-xs text-muted-foreground block">Vibration</span>
                <span className="font-mono font-bold">{node.vibration} mm/s</span>
              </div>
              <div className="bg-muted p-2 rounded">
                <span className="text-xs text-muted-foreground block">Displacement</span>
                <span className="font-mono font-bold">{Math.floor(Math.random() * 50)} με</span>
              </div>
              <div className="bg-muted p-2 rounded">
                <span className="text-xs text-muted-foreground block">Temp</span>
                <span className="font-mono font-bold">{Math.floor(20 + Math.random() * 15)}°C</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
            <Cpu className="size-3.5" /> Hardware Health <span className="text-[9px] bg-muted px-1 rounded">(DEMO)</span>
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-background border rounded p-2">
              <span className="flex items-center gap-2 text-muted-foreground"><Battery className="size-4" /> Battery</span>
              <span className={`font-mono font-bold ${node.battery < 20 ? 'text-warning' : 'text-safe'}`}>{node.battery}%</span>
            </div>
            <div className="flex justify-between items-center bg-background border rounded p-2">
              <span className="flex items-center gap-2 text-muted-foreground"><Wifi className="size-4" /> Signal</span>
              <span className={`font-mono font-bold ${node.signal < 30 ? 'text-warning' : 'text-safe'}`}>{node.signal}%</span>
            </div>
            <div className="flex justify-between items-center bg-background border rounded p-2">
              <span className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4" /> Last Update</span>
              <span className="font-mono font-bold text-xs">Just now</span>
            </div>
          </div>
        </div>

        {node.type !== 'GNSS' && node.type !== 'MEG' && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Trend</h4>
            </div>
            <div className="h-16 bg-muted rounded border border-border flex items-end justify-between px-2 pt-4 pb-1 gap-1">
              {Array.from({ length: 10 }).map((_, i) => {
                const h = Math.max(10, Math.random() * 100);
                return (
                  <div key={i} className="w-full bg-primary/40 rounded-t" style={{ height: `${h}%` }} />
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
