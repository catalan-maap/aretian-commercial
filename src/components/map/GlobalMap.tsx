"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MOCK_ORGS } from "@/lib/data";
import { TYPE_MAP_COLORS, cn } from "@/lib/utils";
import { STATUS_LABELS, ORG_TYPE_LABELS } from "@/types";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export function GlobalMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredOrgs = MOCK_ORGS.filter((o) => {
    const hasCoords = o.lat != null && o.lng != null;
    const matchType = typeFilter === "ALL" || o.type === typeFilter;
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return hasCoords && matchType && matchStatus;
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN || "pk.placeholder";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [10, 20],
      zoom: 2,
      projection: "mercator" as any,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      addMarkers(map);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current?.loaded()) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    addMarkers(mapRef.current);
  }, [filteredOrgs]);

  function addMarkers(map: mapboxgl.Map) {
    filteredOrgs.forEach((org) => {
      if (org.lat == null || org.lng == null) return;

      const el = document.createElement("div");
      el.className = "map-marker";
      el.style.cssText = `
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${TYPE_MAP_COLORS[org.type]};
        border: 2.5px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        cursor: pointer;
      `;

      const popupHTML = `
        <div style="font-family:system-ui,sans-serif;min-width:200px;padding:4px 2px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:32px;height:32px;border-radius:8px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-weight:700;color:#475569;font-size:14px;flex-shrink:0">
              ${org.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight:600;font-size:13px;color:#0f172a">${org.name}</div>
              <div style="font-size:11px;color:#94a3b8">${org.city ?? ""}, ${org.country ?? ""}</div>
            </div>
          </div>
          <div style="font-size:11px;color:#64748b;margin-bottom:4px">
            <span style="color:#94a3b8">Tipo:</span> ${ORG_TYPE_LABELS[org.type]}
          </div>
          <div style="font-size:11px;color:#64748b;margin-bottom:10px">
            <span style="color:#94a3b8">Estado:</span> ${STATUS_LABELS[org.status]}
          </div>
          <a href="/clients/${org.id}" style="display:block;text-align:center;background:#4f46e5;color:white;border-radius:6px;padding:5px 10px;font-size:12px;font-weight:500;text-decoration:none">
            Ver ficha →
          </a>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 14, closeButton: true, maxWidth: "260px" })
        .setHTML(popupHTML);

      el.addEventListener("click", () => {
        popup.addTo(map);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([org.lng, org.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }

  const noToken = !MAPBOX_TOKEN;

  return (
    <div className="relative h-full w-full">
      {/* Filters bar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44 bg-white shadow-sm">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los tipos</SelectItem>
            {Object.entries(ORG_TYPE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 bg-white shadow-sm">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los estados</SelectItem>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-4 z-10 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="mb-2 text-xs font-semibold text-slate-700">Leyenda</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            { label: "Gobierno", color: TYPE_MAP_COLORS.GOVERNMENT },
            { label: "Real Estate", color: TYPE_MAP_COLORS.REAL_ESTATE_DEVELOPER },
            { label: "Smart City", color: TYPE_MAP_COLORS.SMART_CITY },
            { label: "Fondo Inversión", color: TYPE_MAP_COLORS.INVESTMENT_FUND },
            { label: "Multilateral", color: TYPE_MAP_COLORS.MULTILATERAL },
            { label: "Académico", color: TYPE_MAP_COLORS.ACADEMIC },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full border border-white" style={{ background: l.color, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              <span className="text-[10px] text-slate-600">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map container */}
      {noToken ? (
        <div className="h-full w-full bg-slate-100 flex flex-col items-center justify-center gap-4">
          <Globe className="h-16 w-16 text-slate-300" />
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-700">Mapa Global</p>
            <p className="text-sm text-slate-500 mt-1">
              Configura <code className="bg-slate-200 px-1 rounded text-xs">NEXT_PUBLIC_MAPBOX_TOKEN</code> en tu <code className="bg-slate-200 px-1 rounded text-xs">.env.local</code>
            </p>
          </div>
          <div className="mt-4 grid gap-2 max-w-lg w-full px-8">
            {filteredOrgs.map((org) => (
              <a
                key={org.id}
                href={`/clients/${org.id}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ background: TYPE_MAP_COLORS[org.type] }} />
                <span className="text-sm font-medium text-slate-800">{org.name}</span>
                <span className="text-xs text-slate-400">{org.city}, {org.country}</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="h-full w-full" />
      )}

    </div>
  );
}
