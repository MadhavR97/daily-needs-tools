import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS, getTool } from "@/lib/tools";
import { Badge } from "@/components/ui/badge";
import { AdUnit } from "@/components/ad-unit";
import { ToolCard } from "@/components/tool-card";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { DiscountCalculator } from "@/components/tools/DiscountCalculator";
import { BmiCalculator } from "@/components/tools/BmiCalculator";
import { EmiCalculator } from "@/components/tools/EmiCalculator";
import { WordCounter } from "@/components/tools/WordCounter";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { QrGenerator } from "@/components/tools/QrGenerator";
import { CountdownTimer } from "@/components/tools/CountdownTimer";
import { ImageTool } from "@/components/tools/ImageTool";
import { UnitConverter } from "@/components/tools/UnitConverter";

const registry: Record<string, React.ComponentType> = {
  "age-calculator": AgeCalculator,
  "percentage-calculator": PercentageCalculator,
  "discount-calculator": DiscountCalculator,
  "bmi-calculator": BmiCalculator,
  "emi-calculator": EmiCalculator,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "password-generator": PasswordGenerator,
  "qr-generator": QrGenerator,
  "countdown-timer": CountdownTimer,
  "image-resizer-compressor": ImageTool,
  "unit-converter": UnitConverter,
};

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};
  return {
    title: `${t.title} — Free Online`,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/tools/${t.slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const Comp = registry[tool.slug];
  const related = TOOLS.filter((t) => t.slug !== tool.slug && t.category === tool.category).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0" },
    mainEntity: tool.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-slate-500"><Link href="/" className="hover:underline">Home</Link> / <Link href="/#tools" className="hover:underline">Tools</Link> / {tool.title}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">{tool.title}</h1>
        <Badge>{tool.category}</Badge>
      </div>
      <p className="mt-2 max-w-2xl text-slate-500">{tool.description}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <Comp />
          <div className="mt-6"><AdUnit slot={`tool-${tool.slug}`} /></div>
          <section className="mt-6 rounded-2xl border p-5 dark:border-slate-800">
            <h2 className="font-bold">How to use</h2>
            <ol className="mt-2 list-decimal pl-5 text-sm text-slate-600 dark:text-slate-300">
              {tool.howTo.map((s) => <li key={s} className="py-0.5">{s}</li>)}
            </ol>
          </section>
          <section className="mt-4 rounded-2xl border p-5 dark:border-slate-800">
            <h2 className="font-bold">FAQ</h2>
            {tool.faq.map((f) => (
              <details key={f.q} className="mt-2 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </section>
        </div>
        <aside className="space-y-4">
          <AdUnit slot="sidebar" label="Sidebar Ad" />
          <div className="rounded-2xl border p-4 dark:border-slate-800">
            <p className="text-sm font-bold">Related tools</p>
            <div className="mt-3 space-y-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/tools/${r.slug}`} className="block rounded-xl bg-slate-50 p-3 text-sm font-medium hover:bg-indigo-50 dark:bg-slate-800/60 dark:hover:bg-indigo-500/10">
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {related.map((r) => <ToolCard key={r.slug} tool={r} />)}
        </div>
      )}
    </div>
  );
}
