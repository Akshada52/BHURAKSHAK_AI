export const demoOperatorCoverage = {
  activeSensors: 128,
  totalSensors: 128,
  dataUptimePct: 99.8,
  moniteredAreaKm2: 4.2,
  totalAreaKm2: 18.5,
  offlineSensors: 0,
  weakSignal: 2,
  lowBattery: 5,
};

export const demoOperatorAlerts = [
  {
    id: "ALT-2026-042",
    severity: "warning",
    title: "Persistent abnormal deformation trend detected.",
    location: "Panel P-12, Zone Z-04",
    time: "12 mins ago",
    status: "open",
    evidence: {
      sensors: 4,
      persistence: "18-minute persistence",
      tiltTrend: "Increasing tilt rate",
      displacement: "Displacement trend",
      health: "Sensor health normal",
    },
  },
  {
    id: "ALT-2026-041",
    severity: "watch",
    title: "Elevated vibration signature",
    location: "Panel P-11, Zone Z-02",
    time: "1 hr ago",
    status: "acknowledged",
    evidence: {
      sensors: 2,
      persistence: "5-minute persistence",
      tiltTrend: "Stable",
      displacement: "None",
      health: "Sensor health normal",
    },
  },
];

export const demoSensors = Array.from({ length: 25 }, (_, i) => ({
  id: `N-${String(i + 1).padStart(3, "0")}`,
  location: i < 10 ? "Panel P-12" : i < 20 ? "Panel P-11" : "Main Haulage",
  tilt: (Math.random() * 2).toFixed(2),
  tiltRate: (Math.random() * 0.5).toFixed(3),
  vibration: (Math.random() * 5).toFixed(1),
  strain: (Math.random() * 100).toFixed(0),
  temp: (22 + Math.random() * 10).toFixed(1),
  battery: Math.floor(80 + Math.random() * 20),
  signal: Math.floor(70 + Math.random() * 30),
  status: Math.random() > 0.9 ? (Math.random() > 0.5 ? "watch" : "warning") : "normal",
  lastUpdate: "Just now",
}));

export const demoPanels = [
  {
    id: "P-12",
    status: "Active Extraction",
    depth: "180m",
    seam: "Seam-III",
    method: "Bord & Pillar",
    coverage: "100%",
    currentRisk: "WARNING",
  },
  {
    id: "P-11",
    status: "Active Extraction",
    depth: "210m",
    seam: "Seam-III",
    method: "Longwall",
    coverage: "100%",
    currentRisk: "WATCH",
  },
  {
    id: "P-09",
    status: "Sealed",
    depth: "150m",
    seam: "Seam-II",
    method: "Bord & Pillar",
    coverage: "40%",
    currentRisk: "NORMAL",
  },
];
