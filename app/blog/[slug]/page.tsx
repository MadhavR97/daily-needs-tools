import Link from "next/link";
import { notFound } from "next/navigation";

const content: Record<string, { title: string; body: string[]; tool: string; toolSlug: string }> = {
  "how-to-compress-image-to-100kb": {
    title: "How to Compress Image to 100KB Free",
    body: [
      "Open our Image Resizer + Compressor tool. Upload your JPG/PNG.",
      "Set Target KB to 100, choose WebP or JPG, set max width (e.g. 1200px).",
      "Click Resize + Compress. Quality auto-adjusts until under 100KB when possible.",
      "Preview and Download. Everything runs locally — your photo never uploads.",
    ],
    tool: "Open Image Compressor",
    toolSlug: "image-resizer-compressor",
  },
  "how-to-calculate-percentage": {
    title: "How to Calculate Percentage (3 Formulas)",
    body: ["X% of Y = Y × X / 100. Example: 20% of 150 = 30.", "Increase: Y + Y×X/100.", "Use our Percentage Calculator for instant answers."],
    tool: "Open Percentage Calculator",
    toolSlug: "percentage-calculator",
  },
  "how-to-create-qr-code": {
    title: "How to Create a QR Code",
    body: ["Paste URL or text in QR Generator.", "Pick size 256 or 512.", "Download PNG and print. Scans with any phone camera."],
    tool: "Open QR Generator",
    toolSlug: "qr-generator",
  },
};

export function generateStaticParams() {
  return Object.keys(content).map((slug) => ({ slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = content[slug];
  if (!p) notFound();
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-extrabold">{p.title}</h1>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-600 dark:text-slate-300">
        {p.body.map((b) => <li key={b}>{b}</li>)}
      </ol>
      <Link href={`/tools/${p.toolSlug}`} className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white">
        {p.tool}
      </Link>
    </div>
  );
}
