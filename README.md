<div align="center">

# BHURAKSHAK 


### AI-Enabled, Low-Cost, Real-Time Mine Subsidence Monitoring, Prediction and Early Warning for Underground Coal Mines in India

**Problem Statement 26025 · Ministry of Coal / Coal India Limited · Hardware · Smart Automation**

<!-- Replace with your hero image / platform banner -->
<img width="1337" height="767" alt="image" src="https://github.com/user-attachments/assets/1f2ff19e-095f-44de-a6a8-572c5a16ee39" />



`ESP32` · `LoRa 865–867 MHz` · `Edge AI` · `Physics-informed ML` · `Graph + Temporal Deep Learning` · `GIS Decision Support`

</div>

---

## Table of Contents

1. [Overview](#1-overview)
2. [The Problem](#2-the-problem)
3. [What Makes BHURAKSHAK Different](#3-what-makes-BHURAKSHAK-different)
4. [Platform Screenshots](#4-platform-screenshots)
5. [System Architecture](#5-system-architecture)
6. [Layer 1 — Sensor Node (Edge)](#6-layer-1--sensor-node-edge)
7. [Layer 2 — Communication Architecture](#7-layer-2--communication-architecture)
8. [Layer 3 — Principal / Gateway](#8-layer-3--principal--gateway)
9. [Inter-Principal Communication](#9-inter-principal-communication)
10. [Layer 4 — Cloud AI / ML Architecture](#10-layer-4--cloud-ai--ml-architecture)
11. [Decision Support System (DSS) and GIS](#11-decision-support-system-dss-and-gis)
12. [Digital Mine Subsidence Simulator](#12-digital-mine-subsidence-simulator)
13. [Dataset and Evaluation Methodology](#13-dataset-and-evaluation-methodology)
14. [Failure Handling and Resilience](#14-failure-handling-and-resilience)
15. [Security](#15-security)
16. [Hardware, Power and Cost](#16-hardware-power-and-cost)
17. [Design Invariants](#17-design-invariants)
18. [Repository Structure](#18-repository-structure)
19. [Getting Started](#19-getting-started)
20. [Implementation Roadmap](#20-implementation-roadmap)
21. [Honest Limitations](#21-honest-limitations)
22. [References](#22-references)
23. [Team, License and Acknowledgements](#23-team-license-and-acknowledgements)
24. [Appendix — Asset Checklist](#appendix--asset-checklist)

---

## 1. Overview

When coal is extracted from beneath the ground, the surface above can sink. This is **subsidence**. It can crack houses, roads, railways, farmland and forest, and sometimes it happens suddenly over old workings.

**BHURAKSHAK** is a hierarchical sensing and intelligence system that places many small, cheap, solar-powered sensor nodes on the surface above underground coal panels. The nodes measure tilt, crack opening, vibration and temperature, validate their own readings, compare notes with neighbours over a long-range radio mesh, and report to a redundant gateway ("principal") that reasons about the whole area. A cloud layer adds heavier spatial-temporal AI, GIS maps and dashboards.

> **Core idea:** each layer answers only the question it has enough information to answer correctly. No layer may output a risk judgment without a physical prior to compare against and an explicit confidence value attached.

```text
PHYSICAL GROUND
      │
      ▼
┌─────────────────────────────┐
│ ESP32 SENSOR NODE            │  Sense → Validate → Correct → Baseline
│                              │  → Fast/Slow detection → Physics residual
│                              │  → Fusion → Confidence → State
└──────────────┬───────────────┘
               │  LoRa (neighbour evidence + telemetry)
               ▼
┌─────────────────────────────┐
│ PRINCIPAL / GATEWAY (×2)     │  Consensus → Kriging with uncertainty
│ active–standby               │  → Cluster-loss detection → Adaptive sampling
│                              │  → Store-and-forward → Evidence packet
└──────────────┬───────────────┘
               ▼
┌─────────────────────────────┐
│ CLOUD                        │  Physics residual as feature
│                              │  XGBoost / Isolation Forest / Residual-VAE
│                              │  Attention-LSTM / GAT / GNN+GRU (shadow-gated)
└──────────────┬───────────────┘
               ▼
┌─────────────────────────────┐
│ BHURAKSHAK DECISION SUPPORT        │  GIS map · Risk zones · Confidence bands
│                              │  Explainable evidence chain · Operator workflow
└──────────────────────────────┘
```

---

## 2. The Problem

The Ministry of Coal / Coal India Limited problem statement asks for an **indigenous, low-cost, real-time** subsidence monitoring system built around a **localized wireless surface mesh** over underground panels.

| Requirement from the problem statement | How BHURAKSHAK answers it |
|---|---|
| Low-cost smart nodes: tilt, vibration, displacement/stretch, crack, optional positioning | One-PCB ESP32 + LoRa node, ≈ ₹3,100–5,600 prototype-grade (§16) |
| Wireless mesh over mine panels | Star-of-meshes LoRa topology with neighbour-evidence exchange and one-hop relay (§7) |
| Detect abnormal tilt, relative displacement, early cracks, unusual vibration | Fast/slow dual-path edge detection (§6) |
| AI/ML to identify abnormal patterns | Staged stack: statistics → Isolation Forest → Residual-VAE / Attention-LSTM → GNN (§10) |
| Predict subsidence zones | Kriging surface + DBSCAN zoning + GAT (§8, §10) |
| Estimate severity and progression | Physics-informed (PIM/Knothe) + data-driven blend (§10) |
| Automatic early warnings (SMS / email / app) | Tiered alert manager with acknowledgement and escalation (§11) |
| GIS maps and operator/planner/regulator dashboards | Role-based DSS with uncertainty overlays (§11) |
| Offline capability with periodic cloud sync | Offline-first at every hop; store-and-forward (§7, §14) |
| Robust, low power, suited to Indian conditions | IP65, 0–55 °C, monsoon-tested power budget, anti-theft mounting (§16) |
| Scalable across coalfields | Per-cluster principals, inter-principal event merging, cloud reconciliation (§9) |

---

## 3. What Makes BHURAKSHAK Different

A wireless mesh alone is not unique. The value is in the **combination**:

| # | Differentiator | Effect |
|---|---|---|
| 1 | **Surface mesh as an intelligence layer** — neighbours exchange compact evidence, not just routing | Spatial awareness before data reaches the gateway |
| 2 | **Hierarchical intelligence (Information Locality)** — compute at the lowest layer that has enough information | Lower latency, bandwidth, power; works offline |
| 3 | **Anomaly ≠ Subsidence** — local anomaly, spatial deformation and predicted subsidence are three separate claims | Broken sensors, trucks, thermal drift and rain never become mine-wide alarms |
| 4 | **Physics-grounded** — every judgment compared to a PIM/Knothe expected deformation | "Large observed tilt" can still be *expected* mining behaviour |
| 5 | **Reference-node common-noise correction** — stable-ground nodes cancel weather and temperature | Prevents rain events from looking like spatial consensus |
| 6 | **Fast + slow detection paths** with a hardware emergency wake | Catches both sudden events and weeks-long drift |
| 7 | **Uncertainty carried end-to-end** — `(evidence, confidence)` at every layer | Operators see *why* confidence is reduced |
| 8 | **Evidence-preserving** — raw telemetry, features, state and network metadata are all kept | Auditable, retrainable, simulator-comparable |
| 9 | **Fault-class separation** — physical anomaly vs sensor fault vs communication fault vs missing data | A silent node is never read as a stable node |
| 10 | **Shadow-mode model governance** — no learned model is authoritative until validated on real events | Honest about sim-to-real risk |
| 11 | **Event-centric tracking** — event IDs, lifecycle, cross-cluster merging | Lead-time measurement, incident reconstruction |
| 12 | **Offline-first resilience** — nodes, gateways and clusters keep operating when the next layer is gone | Safety does not depend on the internet |

---

## 4. Platform Screenshots

> Place your screenshots in `assets/platform/` and update the filenames below.

### 4.1 Live Operations Dashboard

<p align="center">
  <img width="1339" height="763" alt="image" src="https://github.com/user-attachments/assets/4e497b25-08be-4c6d-bd86-a5bf94bdfce7" />

</p>

*Live map with nodes coloured by state (Stable / Watch / Risk / Fault), active alerts, acknowledgement controls and node-health summary.*

### 4.2 GIS Deformation Map with Uncertainty

<p align="center">
  <img src="assets/platform/02-gis-deformation-map.png" alt="GIS deformation map with kriging surface and confidence overlay" width="900"/>
</p>

*Kriging-interpolated deformation surface with a confidence overlay so "confidently flat" is visually distinct from "unmonitored".*

### 4.3 Risk Zones and Forecast

<p align="center">
  <img src="assets/platform/03-risk-zones-forecast.png" alt="Risk zones and forecast" width="900"/>
</p>

*Graded risk bands (not binary), DBSCAN-delineated zone polygons, and 7 / 14 / 30-day forecast layers.*

### 4.4 Explainable Evidence Packet

<p align="center">
  <img src="assets/platform/04-evidence-packet.png" alt="Explainable evidence chain for an alert" width="900"/>
</p>

*Every alert shows its evidence chain: trend history, neighbour consensus, physics residual, common-mode-corrected reading, fault flags ruled out, and link-health caveats.*

### 4.5 Event Timeline

<p align="center">
  <img src="assets/platform/05-event-timeline.png" alt="Event timeline" width="900"/>
</p>

### 4.6 Network Health View

<p align="center">
  <img src="assets/platform/06-network-health.png" alt="Network health dashboard" width="900"/>
</p>

*Connectivity states (ONLINE / DEGRADED / ISOLATED / DORMANT-LOG), duty-cycle utilisation, backhaul queue depth, failover history.*

### 4.7 Role-Based Views

| Operator / Shift In-charge | Planner / Surveyor | Regulator |
|---|---|---|
| <img src="assets/platform/07-role-operator.png" width="280"/> | <img src="assets/platform/08-role-planner.png" width="280"/> | <img src="assets/platform/09-role-regulator.png" width="280"/> |

### 4.8 Simulator Control Panel

<p align="center">
  <img src="assets/platform/10-simulator-ui.png" alt="BHURAKSHAK simulator" width="900"/>
</p>

### 4.9 Hardware Prototype

<p align="center">
  <img src="assets/hardware/01-node-prototype.png" alt="Sensor node prototype" width="420"/>
  <img src="assets/hardware/02-gateway-prototype.png" alt="Gateway prototype" width="420"/>
</p>

---

## 5. System Architecture

### 5.1 End-to-End Architecture

<p align="center">
  <img src="assets/architecture/01-system-overview.png" alt="End-to-end BHURAKSHAK architecture" width="950"/>
</p>

### 5.2 Architectural Planes

| Plane | Responsibility |
|---|---|
| **Sensing** | Tilt X/Y, displacement/stretch, crack, vibration, temperature, battery, health |
| **Edge Intelligence** | Validation, conditioning, baselines, rate/EWMA/CUSUM, physics residual, local state |
| **Mesh Intelligence** | Telemetry forwarding, neighbour evidence, link health, packet-loss detection |
| **Principal Intelligence** | State table, consensus, kriging, cluster-loss detection, adaptive sampling, buffering |
| **Cloud Intelligence + DSS** | Feature engineering, spatial-temporal ML, GIS, explanation, retraining |

### 5.3 Core Principle: Information Locality

> A computation should be performed at the lowest architectural layer that has enough information to perform it correctly.

| Question | Best layer | Why |
|---|---|---|
| Is my sensor reading valid? | ESP32 node | Only the node sees raw sensor health |
| Is my reading abnormal against my baseline? | ESP32 node | Local baseline suffices |
| Do nearby nodes see something similar? | Neighbour / principal | Needs spatial context |
| Is an event expanding through the mesh? | Principal | Needs multi-node history |
| Where could deformation progress? | Cloud | Needs spatial-temporal learning |
| What should the operator see? | DSS | Combines model + sensor + network evidence |

### 5.4 Intelligence Cascade

```text
measurement → local evidence → neighbour evidence → spatial evidence
            → spatial-temporal prediction → decision support (human decides)
```

<p align="center">
  <img src="assets/architecture/02-intelligence-cascade.png" alt="Intelligence cascade" width="800"/>
</p>

### 5.5 Early-Warning Decision Chain

BHURAKSHAK never goes `sensor → evacuation`. The chain is:

```text
Sensor observation → Local anomaly → Sensor-health check → Temporal persistence
→ Neighbour confirmation → Principal spatial correlation → Cloud spatial-temporal model
→ Risk + confidence + evidence → Decision-support alert → Site-defined safety procedure
```

> BHURAKSHAK is a **decision-support** tool. Evacuation and stoppage decisions remain with authorised people under mine-specific safety procedures.

---

## 6. Layer 1 — Sensor Node (Edge)

<p align="center">
  <img src="assets/architecture/03-node-architecture.png" alt="Sensor node architecture" width="900"/>
</p>

### 6.1 Node Processing Chain

```text
Sensor Drivers → Timestamping → Calibration → Validation
  → Signal Conditioning → Reference-Node Common-Noise Correction
  → Node Baseline (EWMA) → Fast Path (rate / acceleration)
  → Slow Path (CUSUM / persistence) → Physics Prior + Residual
  → Multi-Sensor Fusion → Confidence Estimation
  → Local State Machine → Bit-packed Packet Builder → LoRa TX
```

### 6.2 Sensors

| Sensor | Purpose | Notes |
|---|---|---|
| 2-axis MEMS tilt / inclinometer | Primary deformation signal | Precision part preferred; hobby IMUs are noisier |
| Displacement / stretch | Relative ground movement | Wire-pot or strain-gauge based |
| Crack gauge | Early crack initiation | Fitted on selected nodes |
| Vibration (piezo / MEMS) | Blast / truck filtering, wake trigger | Never alarms alone |
| Temperature | Drift compensation | Placed next to the tilt sensor |
| Battery voltage, tamper switch | Health and security | Reported as fault flags, not deformation |

### 6.3 Node Types (one PCB, role set at commissioning)

| Type | Count | Role |
|---|---|---|
| Sensing node | Most | Tilt, vibration, temperature, battery; crack gauge on selected nodes |
| Reference node | 2–4 per panel (or ~1 in 5) | On stable ground outside the draw zone; defines common-mode drift |
| Relay-capable node | Designated at survey | One-hop backup path for weak links |
| Anchor node (optional) | 1–3 | GNSS for placement / clock sanity |

### 6.4 Signal Conditioning and Baselines

- Moving average / EWMA, median filter, Hampel/MAD spike rejection for impulsive channels, RMS vibration windows.
- Node-specific baseline: `z = (x − μ_node) / (σ_node + ε)`; baseline adapts **slowly** so true deformation is not absorbed.
- Baseline resets are always logged with reason and person — never silent.

### 6.5 Fast Path vs Slow Path

| | Fast path | Slow path |
|---|---|---|
| Method | Rate `v_t` and acceleration `a_t` thresholds | EWMA + CUSUM + persistence |
| Catches | Sudden events (rapid tilt, crack step) | Gradual, weeks-long subsidence drift |
| Cost | Cheap, every sample | Rolling windows |
| Backstop | Hardware **emergency wake** interrupt | Scheduled duty cycle |

<p align="center">
  <img src="assets/architecture/04-fast-slow-paths.png" alt="Fast and slow detection paths" width="800"/>
</p>

### 6.6 Reference-Node Common-Noise Correction

```text
z_corrected = z_node − z_common_mode(reference_nodes)
```

The principal computes the median deviation across reference nodes each cycle. This prevents a rain or heat event from moving every node together and masquerading as spatial consensus.

### 6.7 Physics Prior and Residual

Each node/principal computes an expected deformation from a lightweight subsidence profile model (probability-integral / influence-function approximation) parameterised by panel depth, width and extraction ratio from the mine plan.

```text
residual = observed_deformation − physics_predicted_deformation
```

- Large, sustained residual → strong evidence of anomalous deformation.
- Near-zero residual with large raw tilt → *expected* mining behaviour, not a warning.

**Probability-integral model (strike direction):**

```text
W(x) = (W0 / 2) · [ erf(√π·x / r) − erf(√π·(x − L) / r) ]
W0 = q · m · cos(α)        r = H / tan(β)
Tilt = dW/dx    Horizontal displacement = b·r·dW/dx    Strain = b·r·d²W/dx²
```

### 6.8 Local State Machine and Hysteresis

```text
STABLE → WATCH → RISK        FAULT (sensor/node health prevents interpretation)
Escalate:   A_local > T_high for N samples
De-escalate: A_local < T_low  for M samples      (T_high > T_low)
```

`RISK` means *strong local evidence* — **not** "the mine is subsiding".

<p align="center">
  <img src="assets/architecture/05-node-state-machine.png" alt="Node state machine" width="700"/>
</p>

### 6.9 Emergency Wake Path

Even in deep sleep, the MEMS accelerometer's threshold interrupt wakes the MCU on a sudden-motion event. This allows an aggressively long baseline duty cycle, because a **hardware interrupt**, not the software schedule, is the backstop for fast events.

<p align="center">
  <img src="assets/architecture/06-emergency-wake-path.png" alt="Emergency wake path" width="700"/>
</p>

### 6.10 Bit-Packed Packets (LoRa-constrained)

```text
Telemetry (≤ 51 B @ SF7):
 node_id 2B | seq 2B | timestamp_delta 2B | tilt_x,tilt_y 2B each | displacement 2B
 | crack 2B | vibration_rms 2B | temperature 1B | battery 1B | fault_flags 1B
 | state 1B | confidence 1B | residual 2B | auth_tag 4B

Neighbour evidence (≤ 20 B):
 node_id 2B | seq 1B | local_state 1B | trend 1B | confidence 1B | auth_tag 4B
```

Exact field widths are finalised in Phase 2 firmware bring-up from real SNR / loss data.

---

## 7. Layer 2 — Communication Architecture

### 7.1 Protocol Decision: LoRa (SX1262-class, 865–867 MHz)

| Protocol | Range / hop | Power | Verdict |
|---|---|---|---|
| Wi-Fi mesh | ~50–100 m | High | Rejected — battery life |
| Zigbee | ~100–300 m | Medium | Rejected — too many hops at panel scale |
| **LoRa** | **1–5 km open terrain** | **µA sleep** | **Selected** |

Consequences that shape the whole design: bit-packed payloads, ~1 % duty-cycle ceiling (so adaptive, spatially localised sampling is *mandatory*), and eventual-consistency neighbour exchange over a 1–5 s window.

> Indicative link budget: SX1262 at 14 dBm, SF10/BW125 ≈ 150 dB → ~2–3 km semi-open terrain. **Must be field-verified before final node spacing is fixed.**

### 7.2 Star-of-Meshes Topology

<p align="center">
  <img src="assets/architecture/07-communication-topology.png" alt="Star-of-meshes communication topology" width="900"/>
</p>

```text
                    CLOUD
                      │   MQTT over TLS (cellular / fallback)
        ┌─────────────┴─────────────┐
        │  PRINCIPAL / GATEWAY       │  active–standby pair
        └─────────────┬─────────────┘
                      │ LoRa
       ┌──────┬───────┼───────┬──────┐
      N01    N02     N03     N04    N05   ← 1-hop neighbour evidence between nodes
```

- **Node ↔ Node:** single-hop only, lightweight evidence exchange.
- **Node ↔ Gateway:** direct (star), with **one** pre-configured relay hop if the direct link degrades.
- **Gateway ↔ Cloud:** MQTT/TLS, store-and-forward.

A full multi-hop mesh is deliberately avoided: routing tables, memory and power cost do not fit a ₹3,000–5,000 node budget.

### 7.3 Logical Channels (priority order)

| Priority | Channel | Content | Cadence |
|---|---|---|---|
| 1 | **Emergency / Alert** | Fast-path crossing, tamper, emergency wake | Event-driven, pre-empts slots |
| 2 | **Neighbour Evidence** | State / trend / confidence | Each cycle or on state change |
| 3 | **Telemetry** | Full sensor + edge-feature packet | 15–30 min (STABLE) → 30–60 s (WATCH/RISK cluster) |
| — | **Control / Downlink** | Sampling commands, signed config/firmware | On demand |

### 7.4 Neighbour Evidence (node ↔ node)

- Best-effort broadcast, **no ACK / no retry** — a lost packet only lowers consensus confidence.
- Randomised offset in a scheduled window (slotted-ALOHA style keyed by `node_id mod slots`).
- Each node caches the last N=5 packets per neighbour and computes a local consensus score that rides in its next telemetry packet.
- Evidence from a neighbour flagged *faulty* is discounted, never counted as corroboration.
- Neighbour lists are refreshed periodically (default weekly) — a documented power/accuracy trade-off.

### 7.5 Node → Gateway Reliability

- **At-least-once** with ACK, exponential backoff (base 2 s, cap 60 s, max 3 retries), then local buffering.
- Gateway deduplicates by `(node_id, seq)`.
- **Local flash ring buffer** (500–1,000 readings): oldest normal readings are evicted first; WATCH/RISK and fault-flagged readings are protected.
- Buffered data is sent in timestamp order with `backfill=true` so a delayed reading never triggers a *live* fast-path alert.
- Firmware/config updates are chunked, checksummed and signature-verified; partial updates are discarded.

### 7.6 Duty-Cycle Management

The gateway runs a **time-division schedule** (not pure ALOHA). WATCH/RISK nodes get slot time taken from STABLE nodes' unused capacity. Under congestion, the **spatial leading edge** of an event (newest WATCH transitions) gets priority over already-confirmed RISK nodes, and the dashboard shows a "reporting degraded due to congestion" flag.

### 7.7 Connectivity State Machine

<p align="center">
  <img src="assets/architecture/08-connectivity-state-machine.png" alt="Connectivity state machine" width="700"/>
</p>

```text
ONLINE ──ACK rate <50%──► DEGRADED/RELAY ──relay fails──► ISOLATED ──>24 h──► DORMANT-LOG
   ▲                          │ relay ACK OK                  │ any successful TX
   └──────────────────────────┴───────────────────────────────┘
```

> **Isolation never disables local safety logic.** An isolated node keeps sensing, fusing and running fast-path/emergency-wake logic; only *reporting* stops.

### 7.8 Gateway → Cloud

- MQTT over TLS, batched (≤ 5 min or 50 KB), dual-SIM preferred; satellite/LPWAN fallback is a site-survey decision.
- ≥ 30 days of local storage at baseline duty cycle.
- On reconnect: **most recent data first**, then outage backfill in the background.
- Idempotent ingestion by `(node_id, seq, gateway_batch_id)`.

### 7.9 Delivery Guarantees

| Hop | Guarantee | Mechanism |
|---|---|---|
| Node → Node | Best effort | Loss absorbed into confidence |
| Node → Gateway | At-least-once | ACK + retry + buffer + seq + dedup |
| Via relay | At-least-once | Same + path metadata |
| Gateway → Node | At-least-once, fail-safe | Retry; never apply partial update |
| Gateway → Cloud | At-least-once, idempotent | Store-and-forward + batch dedup |
| **Overall** | **No *silent* data loss** | Sequence-gap detection → explicit data-gap flag |

**Explicitly not guaranteed:** exactly-once delivery, perfect cross-node time ordering, multi-hop mesh resilience beyond one relay.

---

## 8. Layer 3 — Principal / Gateway

<p align="center">
  <img src="assets/architecture/09-principal-architecture.png" alt="Principal / gateway architecture" width="900"/>
</p>

### 8.1 Responsibilities

Packet validation · source reconstruction · node-state table · temporal history · neighbour consensus · spatial correlation with kriging · cluster-loss detection · event grouping · adaptive sampling control · network-health analysis · store-and-forward · explainable evidence packet.

### 8.2 Active–Standby Redundancy

- Both units receive uplink; only the active one transmits downlink.
- Heartbeat over a local link; standby promotes after N missed heartbeats.
- State table is periodically synced so failover loses no history.
- **Split-brain** is resolved by precedence: the unit with the earlier `active_since` wins and the other demotes immediately.

### 8.3 Node State Table

| Node | State | Anomaly | Trend | Confidence | Residual | Health | Sampling |
|---|---|---|---|---|---|---|---|
| N03 | RISK | 0.91 | accelerating | 0.94 | +0.38 (physics-adjusted) | good | high |

### 8.4 Spatial Interpolation with Uncertainty

Ordinary / universal **kriging** over the sparse node graph (using surveyed coordinates) yields:

1. A continuous **deformation surface** for the GIS map.
2. A **variance surface** so "confidently flat" is distinguishable from "unmonitored".

Zones are delineated with **DBSCAN** over node coordinates weighted by anomaly score.

### 8.5 Spatially Localised Adaptive Sampling

```text
STABLE → low burden      WATCH → moderate      RISK → high
PERSISTENT SPATIAL EVENT → regional high-resolution monitoring
```

Only the WATCH/RISK cluster plus its immediate neighbours (for corroboration) is escalated. Controls are bounded: minimum/maximum interval, maximum escalation, maximum duration, cooldown, and a safe fallback if control messages stop.

<p align="center">
  <img src="assets/architecture/10-adaptive-sampling-region.png" alt="Dynamic monitoring region" width="750"/>
</p>

### 8.6 Cluster-Loss Detection

When a contiguous group of nodes goes silent, two hypotheses are surfaced with confidence:

| Hypothesis | Signature |
|---|---|
| **Network cause** (relay, antenna, interference) | Nodes were STABLE before silence |
| **Physical cause** (rapid ground failure) | Rising WATCH/RISK trend, tilt jump or emergency packet before silence |

A *total, simultaneous* loss of every node is routed to a **gateway-health alert**, not a subsidence alert.

### 8.7 Node Density

At 1–3 km LoRa reach and a target resolution of 50–100 m, the prototype recommendation is **one node per 75–100 m grid spacing**, ~100–150 nodes per ~1 km² panel. Survey-line layouts along strike and dip, with reference nodes outside the influence radius, can reduce this substantially and should follow the mine's own plan.

<p align="center">
  <img src="assets/architecture/11-node-layout.png" alt="Recommended node layout over a panel" width="800"/>
</p>

### 8.8 Explainable Evidence Packet

```text
event_id | affected_nodes | trend_history (per node) | neighbour_consensus_score
| physics_residual | common-mode-corrected reading | confidence
| fault_flags_considered_and_ruled_out | link_health_summary
```

### 8.9 Risk Levels and Alerts

| Level | Meaning | Notified |
|---|---|---|
| Normal | Nothing unusual | Dashboard only |
| Watch | Unusual, unconfirmed | Surveyor, planner |
| Warning | Confirmed movement or forecast to reach limit | Shift in-charge, surveyor, manager (repeat until acknowledged) |
| Alarm | Likely serious/sudden failure | Everyone on list + local siren, repeat until acknowledged |

- **A single-node anomaly is never an alert.** Alerts require principal-confirmed, spatially corroborated events.
- Alarm/Warning can be cleared only by an authorised person with a note (audit trail).
- Limits (Warning/Alarm tilt, crack) are **site settings** decided by the mine's safety officers/surveyors, not hard-coded.

---

## 9. Inter-Principal Communication

Large mines have multiple clusters, each with its own principal. A deformation zone crossing a boundary must be treated as **one** event.

<p align="center">
  <img src="assets/architecture/12-inter-principal.png" alt="Inter-principal communication" width="900"/>
</p>

**Selected approach: adjacent principals + cloud** (cloud-only is too backhaul-dependent; a full principal mesh is needlessly complex).

### 9.1 Rules

1. **Geographic neighbours only** — principals whose areas touch or overlap.
2. **Local data ownership** — raw telemetry never leaves the owning principal.
3. **Cluster-based addressing** (`cluster_id`, not hardware IDs) — active/standby failover is transparent to neighbours.

### 9.2 Links

| Tier | Link | Used for |
|---|---|---|
| Primary | Directional Wi-Fi / wired / fibre | Boundary evidence, events, sampling, backhaul relay |
| Secondary | Dedicated LoRa backbone | Compact summaries and heartbeats |
| Tertiary | Cloud | Global state, event merging |

### 9.3 Messages

Heartbeat · Boundary Evidence · Event Notice · Sampling Hint · Common-Mode Summary · Backhaul Relay Request · Version Gossip.

### 9.4 Trust Limits

- Peer evidence is **supporting only** and cannot independently trigger an alert.
- **No evidence echo:** peer evidence carries `hop_count = 1` and cannot be re-forwarded as new evidence.
- No principal may push firmware, models or configuration to another; updates come only through the trusted cloud path.
- Peer messages are signed, replay-protected and sequence-numbered.

### 9.5 Event Merging and GIS Stitching

Event IDs are `cluster_id + counter`. Two events covering the same growing zone merge: the earlier becomes the **parent**, the later the **child**. Only the parent's principal sends the operator alert (no duplicate SMS). Each principal produces its own kriging surface and DBSCAN zone; the cloud stitches them and raises uncertainty where they disagree.

### 9.6 Peer-Link States

`UP → DEGRADED` after 3 missed heartbeats (try primary → LoRa backbone → cloud); `DEGRADED → DOWN` when all paths fail. In `DOWN`, the principal runs independently with reduced boundary confidence.

> **A communication failure must reduce confidence, not stop local monitoring.** Consistency is eventual: local decisions → temporary differences → connectivity restored → cloud reconciliation.

Time is synchronised by GNSS at each principal (NTP via cloud as fallback); large clock skew lowers peer-evidence confidence.

---

## 10. Layer 4 — Cloud AI / ML Architecture

<p align="center">
  <img src="assets/architecture/13-ml-architecture.png" alt="ML architecture overview" width="950"/>
</p>

### 10.1 Four Levels of Intelligence

| Level | Question | Methods |
|---|---|---|
| ESP32 node | Am I behaving differently from normal? | Baseline, EWMA, CUSUM, rate, persistence, health |
| Neighbour mesh | Are nearby nodes seeing the same? | Compact evidence, local consensus |
| Gateway | Is a meaningful region developing? | Weighted consensus / GAT, DBSCAN, kriging, physics comparison |
| Cloud | How severe, and where is it going? | Dual-branch temporal core, physics-informed severity, risk-tier classifier |

### 10.2 Layer 0 — Edge Pre-processing

Sentinel/error handling → Hampel / 3σ outlier rejection → light smoothing → envelope extraction → resampling to a common decision interval (e.g. 5 min) → **RobustScaler** (median/IQR; chosen because mine data has real spikes) → sensor health check (degraded nodes are **down-weighted, not deleted**) → sliding-window buffering (window length is a hyperparameter; start 20–30 steps).

### 10.3 Feature Engineering

| Category | Features |
|---|---|
| Normalised | per-node z-scores |
| Temporal | change, rate, acceleration, persistence, rolling mean/std/max/min |
| Spatial | (x, y), distance to panel centreline, neighbour deltas, cluster size/growth/duration |
| Physical | expected deformation, **physics residual**, distance from panel, mining progress |
| Mining context | face advance, mining speed, extraction progress, depth |
| Reference-node | reference median/mean, node-minus-reference |
| Node / network health | battery, packet loss, RSSI/SNR — **confidence modifier only, never a risk signal** |
| Fusion-derived | composite index with weights learned per site (permutation importance) |

### 10.4 Staged Model Stack (complexity scales with *real* data)

<p align="center">
  <img src="assets/architecture/14-model-stages.png" alt="Staged model complexity and promotion gates" width="850"/>
</p>

| Stage | Model | Purpose | Promotion gate |
|---|---|---|---|
| 1 | Edge statistics + **XGBoost** (with physics residual) | Tabular risk / severity | Always primary |
| 2 | **Isolation Forest** / LSTM-AE / GDN / **Residual-VAE** | Unsupervised anomaly detection | Shadow until validated over ≥ 1 real season |
| 3 | **Attention-LSTM**, GRU, Graph WaveNet / DCRNN | Prediction, progression, lead time | Shadow until ≥ N real labelled events (provisional N = 10) |
| 4 (later) | GAT, GNN + GRU, Temporal Fusion Transformer, multi-task head | Spatial-temporal forecast | Only after Stage 3 beats Stage 1 on real data |

### 10.5 Dual-Branch Temporal Core

**Branch A — Attention-LSTM predictor** (1–2 layers, 32–64 units, kept small): predicts the expected next state; attention picks the timesteps that matter in non-stationary deformation and improves cross-site generalisation.

**Branch B — Residual-VAE anomaly engine:**

```text
residual rₜ = xₜ − x̂ₜ
VAE(rₜ) → latent z (dim ≈ 5) → r̂ₜ
AnomalyScore = MSE(rₜ, r̂ₜ) + β·KL(q(z|rₜ) ‖ p(z))        β ≈ 0.01
Adaptive threshold  T = μ + k·σ over a rolling window     k ≈ 2.6 start, tuned per site
```

Scoring the *error's distribution* rather than the raw signal resists the key failure mode of plain autoencoders: learning to reconstruct a slowly developing, repeating abnormal pattern. Isolation Forest remains a simpler, faster-to-deploy fallback.

### 10.6 Spatial Fusion (Graph Consensus)

```text
Full (GAT):       h_v = Σ_{u∈N(v)} α(v,u)·[anomaly_u, forecast_u, health_u]
Lightweight:      zone_risk_v = Σ w_u·anomaly_u / Σ w_u,   w_u = (1/dist) × health_confidence_u
```

**Hard rule:** one anomalous node with calm neighbours → likely sensor fault → maintenance flag, *no* alert. ≥ 2 adjacent nodes with correlated trend → candidate zone → severity estimation.

### 10.7 Physics-Informed Severity and Progression

```text
Physical baseline: PIM + Knothe time function, adaptive c re-estimated every cycle
                   (short window M ≈ 4, gray/metabolism recursive update)
blended_severity = λ·physics + (1−λ)·data_driven          λ starts at 0.5
progression_rate = d(blended_severity)/dt → STABLE / SLOW / ACCELERATING
```

A poor fit of the physics model is itself a warning: the ground is not behaving like the standard model (old workings, a fault, a shallow void). Shifts in λ toward the data-driven branch are logged and reviewed, not automatic.

### 10.8 Risk Classification — shallow and explainable by design

A gradient-boosted tree or rule table outputs `LOW / MEDIUM / HIGH / CRITICAL`, a probability, a confidence band and a trend arrow. **The last model before a human decision is always the most interpretable model in the pipeline, never the most powerful.**

### 10.9 Uncertainty Propagation

```text
edge_confidence × link_confidence × spatial_consensus_confidence × model_confidence
   = final_alert_confidence
```

Risk and confidence are separate values. Operators see, e.g., *"RISK, confidence 0.71 (reduced by: 2 of 5 cluster nodes have degraded link quality)"*.

### 10.10 Shadow Mode, Promotion and MLOps

```text
TRAINING → OFFLINE VALIDATION → SHADOW MODE → FIELD VALIDATION → APPROVED → DEPLOYED
```

- Every model version records data provenance (simulator vs real, pilot, season), metrics and shadow track record.
- Shadow comparison continues **after** promotion; rollback to the prior signed version takes one config push.
- Drift monitoring covers seasons, sensor ageing, new panels, node replacement and network behaviour.
- Firmware and model updates are signed (Ed25519) and version-tagged; nodes reject unsigned or downgraded updates.
- TinyML on the node is **deferred and justified per deployment** — added only if a field trial shows a specific measured error pattern it corrects.

### 10.11 Adaptive Feedback Loop

Zone risk above MEDIUM → raise sampling and transmission priority on nodes in/near the zone → hold while risk persists → step down after N stable cycles. This closes the loop back to the mesh.

### 10.12 Example ML Output

```json
{
  "event_id": "E20260927_017",
  "node_prediction": {"anomaly_score": 0.89, "severity": "WARNING", "confidence": 0.91},
  "spatial_prediction": {"affected_nodes": ["N16","N17","N18"], "zone_probability": 0.84, "cluster_size": 3},
  "progression": {"trend": "INCREASING", "acceleration": 0.12},
  "evidence": {"neighbour_agreement": 0.88, "physics_residual": 0.73, "persistence": 0.91},
  "model": {"version": "v1.2.0", "branch_a": "attn-lstm-v1", "branch_b": "residual-vae-v1"}
}
```

*Values are illustrative and must be calibrated through pilot testing.*

---

## 11. Decision Support System (DSS) and GIS

| Component | Description |
|---|---|
| **GIS deformation map** | Kriging surface with confidence overlay; layers for mine plan, nodes by state, settlement/tilt/strain surfaces, risk zones, forecasts (7/14/30 d), and exposed surface features (roads, rail, canals, houses, forest) |
| **Risk zones** | Graded bands from the interpolated surface plus principal consensus |
| **Event timeline** | Per-event evidence chain with link-health caveats |
| **Alerts** | SMS / email / app push; escalation and acknowledgement audit trail |
| **Network-health view** | Distinguishes "mine fine, network needs maintenance" from "network fine, real event" |
| **Role dashboards** | Operator, planner/surveyor, regulator (read-only + audit), administrator |

<p align="center">
  <img src="assets/architecture/15-dss-flow.png" alt="DSS data flow" width="850"/>
</p>

Every alert explains itself, for example:

```text
ALARM  Panel 3, Zone B   19-Sep-2026 14:32
Evidence:
  - 4 nodes (N12, N13, N17, N18) show sudden tilt change (0.4° in 40 s)
  - Crack gauge C5 opened 6 mm in 30 s
  - 2 radio links in the same area lost
  - Reference nodes R1, R2 quiet (not weather or temperature)
  - Not external vibration (tilt did not return after 60 s)
  - Physics prior: no movement expected here at this face position
Suggested action: keep people away from Zone B; send a surveyor.
```

---

## 12. Digital Mine Subsidence Simulator

A subsidence simulator that adds random noise to random curves trains a model to detect random noise. BHURAKSHAK implements a recognised subsidence model, runs it forward in time, and samples it at sensor locations.

<p align="center">
  <img src="assets/architecture/16-simulator-architecture.png" alt="Simulator architecture" width="900"/>
</p>

### 12.1 Physics Engine

- **Spatial:** Probability Integral Method (PIM) — `W(x,y) = (W₀/4)·[erf((x+s₀)/r) − erf((x−Wp+s₀)/r)]·[erf((y+s₀)/r) − erf((y−Lp+s₀)/r)]`
- **Temporal:** Knothe function `φ(t) = 1 − e^(−c·t)`, upgraded to a logistic / Richards S-curve to model *slow → accelerating → decelerating → stable* behaviour; `D(x,y,t) = W(x,y)·φ(t − t_start)`.
- **Geometry regimes:** sub-critical (W/H < 0.6), critical (0.6–1.4), super-critical (> 1.4); ~20–30 % of virtual nodes are placed outside the angle of draw as true negatives.
- **Coupling:** tilt, horizontal displacement, curvature and strain are derivatives of **one** surface, so spatial correlation is enforced, not faked.
- **References:** IS 15026:2002 (Indian standard for subsidence prediction), NIOSH SDPS, Knothe (1952), Litwiniszyn random-medium theory.

### 12.2 Sensor Observation Model

`displacement`, `tilt_x/y = ∂D/∂x,y`, `velocity`, `acceleration`, `strain = b·r·∂²D/∂x²`, `crack_flag`. **Vibration is a decoupled channel** driven by blasts/machinery, including vibration-only events with no deformation (teaching *vibration ≠ subsidence*).

**Realism layer:** Gaussian noise, packet loss, spikes, drift, flatline, node failure.

### 12.3 Scenarios

Normal · gradual subsidence · rapid subsidence · localised deformation · expanding deformation · rainfall / soil disturbance · thermal drift · vehicle vibration · sensor bias · sensor stuck · packet loss · node outage · route failure · mixed events.

### 12.4 Reproducibility and Exports

Each run keeps `scenario`, `run_id`, `seed`, ground truth, and observations **separately** (the answer key is never touched by the noise layer). Exports: `raw_sensor_data.csv`, `edge_features.csv`, `node_states.csv`, `neighbor_consensus.csv`, `principal_events.csv`, `ground_truth.csv`, `network_health.csv`.

> The simulator is a **development, regression and edge-case stress-testing tool — not a training-data source of record** once field data exists. It is a controllable, repeatable approximation, not a claim of exact physical reproduction.

### 12.5 Communication Failure Injection

The simulator injects, independently and in combination: packet loss per hop, node/gateway power loss, clock drift/rollback, relay failure, backhaul flapping, congestion / retry storms, and replay/spoofing — with the same ground-truth-vs-observation separation as physical scenarios.

---

## 13. Dataset and Evaluation Methodology

### 13.1 Dataset

**2,039,558 rows × 15 columns:**
`displacement_mm, tilt_x_mm_per_m, tilt_y_mm_per_m, strain_mm_per_m, vibration_mm_s, battery_v, health, x_m, y_m, label, fault_label, in_draw_zone, scenario, run_id, seed`

### 13.2 Leakage-Safe Splitting

Random row splits are **invalid** because rows from one simulated event are highly correlated. Split by `run_id` (and preferably hold out whole scenarios):

```text
TRAIN (run_id groups A) → VALIDATION (different run_ids) → TEST (unseen runs / scenarios)
```

### 13.3 Metrics

| Task | Metrics |
|---|---|
| Anomaly detection | Precision, Recall, F1, **PR-AUC**, false-alarm rate, detection delay, event detection rate |
| Spatial / zone | Precision, Recall, IoU, localisation error, affected-area error |
| Severity | Macro-F1, confusion matrix, calibration |
| Progression | Forecast error (per horizon), transition detection, time-to-threshold error |
| **Headline** | **Alert lead time** = `T_critical − T_warning` |
| Robustness | Metrics at 0 / 5 / 10 / 20 % faulty sensors; 10 → 500 node scalability curve |

### 13.4 Validation Chain

```text
Synthetic simulation → public InSAR / subsidence datasets → lab ESP32 test rig
→ pilot panel with total-station / GNSS / InSAR ground truth → promotion gates
```

Only data from the pilot and independent ground-truth fusion counts toward model promotion. Simulator-trained weights, if used as a warm start, are flagged as such in the registry and never deployed authoritatively without real-data fine-tuning.

### 13.5 Anti-Overclaiming Policy

Any F1 computed against percentile-based labels must be reported as **"against synthetic/statistical ground truth"**. No accuracy figure is claimed for the field until pilot validation. False-alarm rates cannot be proven in short tests: with zero false alarms in T weeks, the 95 % upper bound is ≈ 3/T per week (rule of three), so BHURAKSHAK reports **bounds, not claims**.

---

## 14. Failure Handling and Resilience

> **Principle:** every layer remains useful when the next layer becomes unavailable.

| Scenario | Handling |
|---|---|
| Single sensor fault | Channel flagged, excluded from scoring; other channels continue |
| Rain-driven mesh-wide drift | Reference-node correction |
| Cluster goes silent | Network-vs-physical hypothesis with confidence |
| Gateway failure | Active–standby failover; nodes buffer meanwhile |
| Gateway antenna / lightning | "All nodes at once" signature → gateway-health alert, not subsidence |
| Cloud / backhaul outage | Store-and-forward; local DSS continues |
| Flapping connection | Exponential backoff, larger batches |
| Retry storm after regional outage | Randomised jittered backoff per node |
| Replay / spoofed packet | AES-CMAC + monotonic counters |
| Out-of-order backfill | Original sensing timestamps + `backfill=true` |
| Clock rollback | Re-sync from gateway before reporting; correct or discard |
| Plausible-but-wrong sensor data | Physics residual + reference correction + neighbour consistency |
| Firmware update interrupted | Partial update discarded; run prior firmware |
| Model degrades after deployment | Continuous shadow comparison + rollback |
| Theft / vandalism | Tamper-resistant mounting, tamper flag, missing-node surfacing |
| Silent data loss | Sequence-gap → explicit **data gap**, never read as "normal" |

<p align="center">
  <img src="assets/architecture/17-failure-matrix.png" alt="Failure matrix" width="850"/>
</p>

---

## 15. Security

| Area | Mechanism |
|---|---|
| Packet authentication | AES-CMAC, 4-byte truncated tag, per-node keys |
| Replay protection | Monotonic sequence counter; out-of-window sequences rejected |
| Gateway → cloud | TLS-authenticated channel (MQTT/TLS) |
| Firmware / model | Signed (Ed25519), version-tagged, downgrade-rejecting |
| Inter-principal | Per-principal identity, signed messages, no peer control authority |
| Physical | Anti-tamper fixings, tamper-switch fault flag, potted radio/MCU, unbranded enclosures |
| Alerts | SMS acknowledgements accepted only from listed numbers |

**Stated threat model:** defends against spoofing, replay and casual tampering. It does **not** claim resistance to a well-resourced adversary with physical access extracting node keys — accepted given the cost ceiling and documented as a limitation.

---

## 16. Hardware, Power and Cost

### 16.1 Indicative Bill of Materials (per node, prototype-grade)

| Component | Example | Cost (₹) |
|---|---|---|
| MCU + LoRa | ESP32 + SX1262 module | 900–1,200 |
| Tilt sensor (2-axis) | MEMS inclinometer | 250–600 |
| Displacement / stretch | Wire-pot or strain-gauge | 300–700 |
| Crack sensor | Resistive/capacitive gauge | 150–400 |
| Vibration | Piezo/MEMS (0 if shared with tilt) | 0–300 |
| Battery | LiFePO₄ preferred; Li-ion with thermal cut-off | 300–500 |
| Solar + charger | 0.5–2 W panel + charge controller | 400–700 |
| Enclosure | IP65 UV-stabilised | 300–600 |
| Misc | PCB, antenna, mounting | 400–600 |
| **Total** | | **≈ ₹3,100–5,600** |

Full RTK GNSS per node is cost-prohibitive; nodes are surveyed **once** at deployment and position is stored as a static attribute in the principal's registry.

### 16.2 Power Budget

| Mode | Behaviour |
|---|---|
| Sleep | < 20 µA target (measure the **whole node**, not the chip) |
| Active burst | ~80–120 mA for 200–500 ms |
| Baseline (STABLE) | 1 reading + TX every 15–30 min → average well under 1 mA |
| Elevated (WATCH/RISK) | 30–60 s, **affected cluster only** |
| Worst case | Battery-only operation ≥ 30 days of baseline in low-solar monsoon |

### 16.3 Environmental Specification

IP65 minimum · 0–55 °C operation · conformal-coated PCB · UV-stabilised enclosure · surge protection on antenna and solar lines · pedestal-mounted (0.5–1 m deep steel rod or small concrete pedestal; no tall thin poles) · panel on a short arm so wind does not load the box.

### 16.4 Gateway Hardware

Raspberry Pi 4/5-class with SSD / high-endurance storage · SX1262 LoRa HAT with outdoor antenna · 4G/GSM modem (SMS is the most reliable alert channel where data signal is weak) · RTC / GNSS time · relay board for siren · watchdog · mains + UPS (≥ 24 h target).

<p align="center">
  <img src="assets/hardware/03-bom-and-wiring.png" alt="Node wiring and BOM" width="800"/>
</p>

---

## 17. Design Invariants

```text
BAD SENSOR ≠ GROUND DEFORMATION
COMMUNICATION FAILURE ≠ GROUND DEFORMATION
POOR LINK QUALITY → LOWER CONFIDENCE, NOT HIGHER RISK
A SINGLE NODE ANOMALY IS NEVER AN ALERT
LOCAL ANOMALY ≠ CONFIRMED SUBSIDENCE
NO RISK JUDGMENT WITHOUT AN ATTACHED PHYSICAL PRIOR
NO RISK JUDGMENT WITHOUT AN ATTACHED CONFIDENCE VALUE
RISK AND CONFIDENCE ARE SEPARATE VALUES
NO MODEL IS AUTHORITATIVE UNTIL VALIDATED ON REAL EVENTS
NO UNSIGNED FIRMWARE / MODEL UPDATE IS ACCEPTED
NO SINGLE PRINCIPAL IS A SINGLE POINT OF FAILURE
RAW TELEMETRY MUST REMAIN RECOVERABLE
RELAY NODES PRESERVE SOURCE IDENTITY
ADAPTIVE SAMPLING IS ALWAYS BOUNDED
CLOUD FAILURE MUST NOT STOP LOCAL MONITORING
MISSING DATA IS NEVER SILENTLY TREATED AS "NORMAL"
MODEL EVALUATION MUST AVOID RUN / SCENARIO LEAKAGE
FINAL OPERATIONAL ACTIONS FOLLOW SITE-DEFINED SAFETY PROCEDURES
```

---

## 18. Repository Structure

> Adjust to match your actual repository layout.

```text
.
├── README.md
├── assets/
│   ├── platform/            # dashboard & GIS screenshots
│   ├── architecture/        # all architecture diagrams
│   └── hardware/            # node / gateway photos, wiring
├── docs/
│   ├── architecture_v3.md
│   ├── communication_architecture.md
│   ├── inter_principal_communication.md
│   ├── ml_architecture_v2.md
│   ├── simulator_research_notes.md
│   └── edge_processing_research_report.md
├── firmware/
│   ├── sensors/  calibration/  filtering/  baseline/  statistics/
│   ├── temporal/ physics/      fusion/     state_machine/
│   ├── mesh/     packets/      health/     storage/
│   └── tinyml/                # optional, deferred
├── gateway/
│   ├── ingestion/  validation/  node_state/  spatial/  temporal/
│   ├── adaptive_control/  buffering/  cloud_sync/  network_health/
├── cloud/
│   ├── ingestion/  feature_engineering/  dataset/
│   ├── xgboost/  isolation_forest/  residual_vae/  attention_lstm/
│   ├── gnn/  gnn_gru/  evaluation/  model_registry/  inference/
├── dss/
│   ├── live_map/  node_status/  event_timeline/
│   ├── risk_zones/  explanations/  alerts/
└── simulator/
    ├── configs/               # one YAML per scenario
    ├── deformation_engine/    # PIM + Knothe / logistic
    ├── virtual_sensors/       # noise, drift, dropout, faults
    ├── ground_truth/          # isolated answer key
    └── adapters/              # CSV / JSON / MQTT / REST / WebSocket
```

---

## 19. Getting Started

> The commands below are **placeholders**. Replace them with the real entry points of your repository.

### Prerequisites

- Python 3.10+ (simulator, gateway, cloud, ML)
- PlatformIO or ESP-IDF (firmware)
- PostgreSQL + PostGIS (cloud database)
- An MQTT broker, e.g. Mosquitto (gateway ↔ cloud)

### Run the simulator

```bash
git clone <your-repo-url>
cd <your-repo>

python -m venv .venv && source .venv/bin/activate
pip install -r simulator/requirements.txt

# one scenario, reproducible
python -m simulator.run --config simulator/configs/gradual_subsidence.yaml --seed 42

# full experiment matrix (10 → 500 nodes, noise sweep, fault injection)
python -m simulator.sweep --matrix simulator/configs/experiment_matrix.yaml
```

### Start the gateway pipeline

```bash
mosquitto -v &
python -m gateway.main --config gateway/config.local.yaml
```

### Start the cloud + DSS

```bash
docker compose up -d postgres api dss
# DSS available at http://localhost:3000
```

### Flash a node

```bash
cd firmware
pio run -e esp32_sx1262 -t upload
# set role at commissioning: sensing | reference | relay | anchor
```

### Commissioning a real panel

1. Plan layout with the mine surveyor: survey lines (strike/dip), reference nodes on stable ground, gateway site.
2. Install pedestals and nodes; record coordinates and axis directions.
3. Run a field range test; confirm every node has a route (direct or via its designated relay).
4. Wait a few hours, then record baselines (logged with who/when/why).
5. Learn per-node temperature coefficients from quiet days.
6. **Shadow mode for 4–8 weeks** — decisions shown to engineers only; tune limits and count false alarms.
7. Go live only after false-alarm and noise levels are acceptable.

---

## 20. Implementation Roadmap

| Phase | Scope |
|---|---|
| 1 | **Edge foundation** — sensors, validation, reference correction, fast/slow paths, physics prior |
| 2 | **LoRa mesh** — bit-packed packets, neighbour evidence, seq numbers, link health, field link budget |
| 3 | **Principal (redundant pair)** — state table, consensus, kriging, cluster-loss, failover |
| 4 | **Cloud Stage 1** — XGBoost baseline with physics residual |
| 5 | **Pilot deployment + ground-truth fusion** — total station / GNSS / InSAR |
| 6 | **Stage 2 (shadow)** — Isolation Forest / Residual-VAE |
| 7 | **Stage 3 (shadow)** — Attention-LSTM, Graph WaveNet / DCRNN |
| 8 | **MLOps hardening** — signed updates, model registry, tested rollback |
| 9 | **Inter-principal + multi-cluster** — event merging, GIS stitching |
| 10 | **Stage 4 (optional)** — GAT + GRU, TFT, TinyML if justified |

Development rule: make sensor data reliable → local detection reliable → mesh reliable → spatial consensus reliable → adaptive sampling reliable → trustworthy dataset → XGBoost baseline → graph / temporal models → combine → evaluate the full hierarchy. Each layer is independently testable.

### Claims to test, not to assert

1. Reference-node correction reduces day-night tilt drift.
2. Scheduled routing beats unscheduled flooding on the same hardware.
3. The mesh reroutes within a few frames when a relay is switched off.
4. Tilt-derived strain misses a localised crack that a gauge catches (decides whether crack gauges are worth their cost).
5. Vibration adds useful evidence beyond the neighbour vote.

---

## 21. Honest Limitations

- **No promise of minutes of warning for a truly sudden pot-hole.** Gradual subsidence can give days to weeks; sudden collapse may be detected only as it happens, or in its last seconds/minutes if precursors exist — which is **not proven**.
- **Gaps between nodes.** A small collapse entirely between nodes may be missed.
- **Depends on good inputs.** Wrong panel data or face position makes the physics prior wrong.
- **Limits are local.** Alarm limits belong to the mine's safety plan and studies.
- **Does not replace surveys.** Level surveys and DGPS remain ground truth; BHURAKSHAK fills the gap between them.
- **Decision support, not authority.** Whether it supplements statutory monitoring is for the mine and regulator to decide.
- **Not yet measured.** Link budgets, power figures and thresholds are design targets until verified on hardware and at a pilot site.
- **ML is unproven in the field.** Learned models are second opinions until they clear real-event promotion gates.
- **Edge-model sizes are unverified.** Isolation Forest / TinyML footprints must be measured on the target ESP32 build, not assumed.
- **Security scope.** Not resistant to a well-resourced attacker with physical key-extraction access.

---

## 22. References

- **IS 15026:2002** — Code of Practice for Prediction of Ground Subsidence due to Coal Mining (Bureau of Indian Standards)
- Litwiniszyn, J. — random-medium theory underlying the Probability Integral Method
- Knothe, S. (1952) — *Equation of the subsidence profile*
- NIOSH / VPI&SU — Surface Deformation Prediction System (SDPS)
- Peng, S.S. (1992) — width-to-overburden ratio thresholds
- Li & Liu, **SASA** (IPSN 2007) — coal-mine sensor network using the network itself to sense structure change
- Vasiljevic et al. (2025) — Federated Isolation Forest on edge IoT, arXiv:2506.05138
- Casari & Zorzi — processing vs transmission energy trade-offs, arXiv:1206.2129
- Bosman et al. (2017) — spatial anomaly detection using neighbourhood information, *Information Fusion*
- Espressif — ESP32 Security Overview (Secure Boot, OTA rollback, flash encryption)
- DoT / WPC (2018) — 865–867 MHz band clarification (1 W transmit power, 4 W ERP, 200 kHz carrier bandwidth)
- CIMFR studies on subsidence over Jharia and Raniganj; Sentinel-1 InSAR studies of Raniganj

*Pull exact DOIs/citations from primary sources when preparing a formal report.*

---

## 23. Team, License and Acknowledgements

**Team:** `<team name>` — `<member 1>`, `<member 2>`, `<member 3>` …

**Event / Problem Statement:** Smart India Hackathon — PS 26025, Ministry of Coal / Coal India Limited

**License:** `<choose a license, e.g. MIT / Apache-2.0>`

**Acknowledgements:** Ministry of Coal, Coal India Limited, CIMFR, BIS (IS 15026), and the open-source communities behind ESP-IDF, RadioLib, scikit-learn, PyTorch, XGBoost, PostGIS and MapLibre.

---

## Appendix — Asset Checklist

Create these folders and drop in your images. Rename the files, or edit the paths above, to match.

| Path | What it should show |
|---|---|
| `assets/platform/00-hero-banner.png` | Banner / hero image |
| `assets/platform/01-live-dashboard.png` | Live operations dashboard |
| `assets/platform/02-gis-deformation-map.png` | GIS map with kriging + confidence overlay |
| `assets/platform/03-risk-zones-forecast.png` | Risk zones and forecast layers |
| `assets/platform/04-evidence-packet.png` | Alert evidence chain |
| `assets/platform/05-event-timeline.png` | Event timeline |
| `assets/platform/06-network-health.png` | Network-health view |
| `assets/platform/07-role-operator.png` | Operator view |
| `assets/platform/08-role-planner.png` | Planner/surveyor view |
| `assets/platform/09-role-regulator.png` | Regulator view |
| `assets/platform/10-simulator-ui.png` | Simulator interface |
| `assets/architecture/01-system-overview.png` | End-to-end architecture |
| `assets/architecture/02-intelligence-cascade.png` | Information-locality cascade |
| `assets/architecture/03-node-architecture.png` | Node processing chain |
| `assets/architecture/04-fast-slow-paths.png` | Fast vs slow detection |
| `assets/architecture/05-node-state-machine.png` | STABLE / WATCH / RISK / FAULT |
| `assets/architecture/06-emergency-wake-path.png` | Emergency wake flow |
| `assets/architecture/07-communication-topology.png` | Star-of-meshes topology |
| `assets/architecture/08-connectivity-state-machine.png` | ONLINE → DORMANT-LOG |
| `assets/architecture/09-principal-architecture.png` | Principal / gateway |
| `assets/architecture/10-adaptive-sampling-region.png` | Dynamic monitoring region |
| `assets/architecture/11-node-layout.png` | Panel node layout |
| `assets/architecture/12-inter-principal.png` | Inter-principal communication |
| `assets/architecture/13-ml-architecture.png` | ML architecture |
| `assets/architecture/14-model-stages.png` | Staged models + promotion gates |
| `assets/architecture/15-dss-flow.png` | DSS data flow |
| `assets/architecture/16-simulator-architecture.png` | Simulator pipeline |
| `assets/architecture/17-failure-matrix.png` | Failure handling |
| `assets/hardware/01-node-prototype.png` | Node prototype photo |
| `assets/hardware/02-gateway-prototype.png` | Gateway prototype photo |
| `assets/hardware/03-bom-and-wiring.png` | Wiring diagram / BOM |

<div align="center">

**BHURAKSHAK — sense locally, confirm spatially, learn globally, and let people decide.**

</div>
