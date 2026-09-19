import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dailyneedstools.vercel.app";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...TOOLS.map((t) => ({ url: `${base}/tools/${t.slug}`, lastModified: new Date() })),
  ];
}
