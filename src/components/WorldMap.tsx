"use client";

import DottedMap from "dotted-map";
import { useMemo } from "react";
import { useLang } from "@/lib/lang";

const TIRANA_LAT = 41.3275;
const TIRANA_LNG = 19.8187;

export const WorldMap = () => {
  const { t } = useLang();

  const svgUri = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: "diagonal" });
    const svg = map.getSVG({
      radius: 0.22,
      color: "rgba(196, 177, 250, 0.45)",
      shape: "circle",
      backgroundColor: "transparent",
    });
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  // dotted-map outputs an equirectangular projection covering the full lat/lng range.
  const x = ((TIRANA_LNG + 180) / 360) * 100;
  const y = ((90 - TIRANA_LAT) / 180) * 100;

  return (
    <div className="world-map">
      {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URI */}
      <img className="world-map-img" src={svgUri} alt="" aria-hidden="true" />
      <div
        className="world-map-marker"
        style={{ left: `${x}%`, top: `${y}%` }}
        aria-label={t.contact.detail.location}
      >
        <span className="world-map-pulse" />
        <span className="world-map-dot" />
        <span className="world-map-label">{t.contact.detail.location}</span>
      </div>
    </div>
  );
};
