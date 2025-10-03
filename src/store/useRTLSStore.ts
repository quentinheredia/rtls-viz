import { create } from 'zustand';
import type { Anchor, Tag, Alert, TrackPoint, HealthMetrics, Geofence } from '@/types/rtls';

interface RTLSStore {
  anchors: Anchor[];
  tags: Tag[];
  alerts: Alert[];
  tracks: TrackPoint[];
  health: HealthMetrics;
  geofences: Geofence[];
  selectedEntity: { type: 'anchor' | 'tag'; id: string } | null;
  
  setAnchors: (anchors: Anchor[]) => void;
  setTags: (tags: Tag[] | ((prev: Tag[]) => Tag[])) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (id: string, update: Partial<Alert>) => void;
  addTrackPoint: (point: TrackPoint) => void;
  setHealth: (health: Partial<HealthMetrics>) => void;
  setSelectedEntity: (entity: { type: 'anchor' | 'tag'; id: string } | null) => void;
}

export const useRTLSStore = create<RTLSStore>((set) => ({
  anchors: [],
  tags: [],
  alerts: [],
  tracks: [],
  geofences: [],
  health: {
    ingestToUiMs: 0,
    packetLossPct: 0,
    wsConnected: false,
    uptime: 0,
  },
  selectedEntity: null,

  setAnchors: (anchors) => set({ anchors }),
  setTags: (tags) => set((state) => ({ tags: typeof tags === 'function' ? tags(state.tags) : tags })),
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  updateAlert: (id, update) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, ...update } : a)),
    })),
  addTrackPoint: (point) =>
    set((state) => ({
      tracks: [...state.tracks.filter((t) => !(t.tagId === point.tagId && t.ts === point.ts)), point],
    })),
  setHealth: (health) => set((state) => ({ health: { ...state.health, ...health } })),
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
}));
