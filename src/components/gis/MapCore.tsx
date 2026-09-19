import { useState } from "react";
import Map, { NavigationControl, MapLayerMouseEvent } from "react-map-gl/maplibre";
import { Layers, Activity, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "maplibre-gl/dist/maplibre-gl.css";

import { MapLayers } from "./MapLayers";
import { NodeDetailPanel } from "./NodeDetailPanel";

const INITIAL_VIEW_STATE = {
  longitude: 85.3421,
  latitude: 23.7957,
  zoom: 14.5,
  pitch: 45,
  bearing: -15,
};

interface MapCoreProps {
  initialLayers?: { [key: string]: boolean };
  onPanelClick?: (panelId: string) => void;
  onZoneClick?: (zoneId: string) => void;
}

export function MapCore({ initialLayers = {}, onPanelClick, onZoneClick }: MapCoreProps) {
  const [activeNode, setActiveNode] = useState<any | null>(null);
  
  const [layers, setLayers] = useState({
    boundary: true,
    panels: true,
    sdn: true,
    hmn: true,
    meg: true,
    gnss: true,
    riskZones: true,
    infrastructure: true,
    ...initialLayers
  });

  const [showLayerControl, setShowLayerControl] = useState(false);

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    if (!e.features || e.features.length === 0) {
      setActiveNode(null);
      return;
    }

    const feature = e.features[0];
    const source = feature.source;

    // Check if clicked a node
    if (['sdn-nodes', 'hmn-nodes', 'meg-nodes', 'gnss-nodes'].includes(source)) {
      setActiveNode(feature.properties);
      return;
    }

    // Check if clicked a panel
    if (source === 'panels' && onPanelClick) {
      onPanelClick(feature.properties?.id);
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border shadow-sm group">
      <Map
        mapLibreLogo={true}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={['sdn-points', 'hmn-points', 'meg-points', 'gnss-points', 'panels-fill']}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" />
        <MapLayers visible={layers} />
      </Map>

      {/* Layer Control */}
      <div className="absolute top-4 left-4 z-10 flex flex-col items-start">
        <button 
          onClick={() => setShowLayerControl(!showLayerControl)}
          className={`bg-background/90 backdrop-blur border p-2 rounded-lg shadow-sm hover:bg-muted transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${showLayerControl ? 'bg-muted' : ''}`}
        >
          <Layers className="size-4 text-primary" /> Layers
        </button>
        
        <AnimatePresence>
          {showLayerControl && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-background/95 backdrop-blur-md border border-border/50 p-4 rounded-xl shadow-xl w-56 text-sm"
            >
              <div className="space-y-3">
                {Object.entries(layers).map(([key, isVisible]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer capitalize group/label">
                    <span className="text-xs font-semibold tracking-wide group-hover/label:text-primary transition-colors">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className={`w-8 h-4 rounded-full transition-colors relative ${isVisible ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-background transition-all ${isVisible ? 'left-4.5' : 'left-0.5'}`} />
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={isVisible} 
                      onChange={() => toggleLayer(key as keyof typeof layers)}
                    /> 
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Unified Legend */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-6 right-10 bg-background/80 backdrop-blur-md border border-border/50 p-4 rounded-xl shadow-lg text-xs"
      >
        <h4 className="font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
          <MapPin className="size-3 text-muted-foreground" /> Risk Legend
        </h4>
        <div className="space-y-3 font-semibold">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-safe border-2 border-background shadow-[0_0_0_1px_rgba(255,255,255,0.2)]" /> 
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-caution border-2 border-background shadow-[0_0_0_1px_rgba(255,255,255,0.2)]" /> 
            <span>Watch</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-warning border-2 border-background shadow-[0_0_0_1px_rgba(255,255,255,0.2)]" /> 
            <span className="text-warning">Warning</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-critical border-2 border-background shadow-[0_0_0_1px_rgba(255,255,255,0.2)]" /> 
            <span className="text-critical">High Risk</span>
          </div>
        </div>
      </motion.div>

      {activeNode && <NodeDetailPanel node={activeNode} onClose={() => setActiveNode(null)} />}
    </div>
  );
}
