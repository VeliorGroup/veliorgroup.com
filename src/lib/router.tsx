"use client";

import { useRouter } from "next/navigation";

export type Route = "home" | "about" | "services" | "contact";

const PATHS: Record<Route, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
};

export function useNavigate() {
  const router = useRouter();
  return (r: Route) => {
    router.push(PATHS[r]);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  };
}

export function pathOf(r: Route): string {
  return PATHS[r];
}
