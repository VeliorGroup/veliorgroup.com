import type { MetadataRoute } from "next";

const SITE = "https://veliorgroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: updated,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
