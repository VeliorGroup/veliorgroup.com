"use client";

import DottedMap from "dotted-map";
import { useMemo } from "react";
import { useLang } from "@/lib/lang";

// HQ + main markets (areaServed: IT, AL, CH, GB, US)
const HQ = { lat: 41.3275, lng: 19.8187 }; // Tirana
const MARKETS: { lat: number; lng: number }[] = [
  { lat: 41.9028, lng: 12.4964 }, // Rome
  { lat: 47.3769, lng: 8.5417 }, // Zurich
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 40.7128, lng: -74.006 }, // New York
];

export const WorldMap = () => {
  const { t } = useLang();

  const { svgUri, hq, markets } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.32,
      color: "rgba(196, 177, 250, 0.55)",
      shape: "circle",
      backgroundColor: "transparent",
    });
    const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
    const w = vb ? parseFloat(vb[1]) : 200;
    const h = vb ? parseFloat(vb[2]) : 100;
    const toPct = ({ lat, lng }: { lat: number; lng: number }) => {
      const pin = map.getPin({ lat, lng }) as { x: number; y: number };
      return { x: (pin.x / w) * 100, y: (pin.y / h) * 100 };
    };
    return {
      svgUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      hq: toPct(HQ),
      markets: MARKETS.map(toPct),
    };
  }, []);

  return (
    <div className="world-map">
      {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URI */}
      <img className="world-map-img" src={svgUri} alt="" aria-hidden="true" />
      {markets.map((m, i) => (
        <span
          key={i}
          className="world-map-market"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-hidden="true"
        />
      ))}
      <div
        className="world-map-marker"
        style={{ left: `${hq.x}%`, top: `${hq.y}%` }}
        aria-label={t.contact.detail.location}
      >
        <span className="world-map-pulse world-map-pulse-2" />
        <span className="world-map-pulse" />
        <span className="world-map-ring" />
        <span className="world-map-dot" />
      </div>
      <span className="world-map-label" style={{ left: `${hq.x}%`, top: `${hq.y}%` }}>
        {t.contact.detail.location}
      </span>
    </div>
  );
};
