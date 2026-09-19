import { HomeSearch } from "@/components/home-search";
import { AdUnit } from "@/components/ad-unit";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="pb-10">
      <section className="mx-auto max-w-2xl pt-12 text-center">
        <Badge>100% Free · No signup · Private</Badge>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Everyday tools people <span className="text-indigo-600 dark:text-indigo-400">actually need</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Calculators, text tools, image compressor, QR, timers and converters. Fast, clean, works on mobile.
        </p>
      </section>

      <HomeSearch />

      <div className="mx-auto mt-10 max-w-3xl">
        <AdUnit slot="homepage-feed" />
      </div>

      <section className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          { icon: Zap, t: "Blazing fast", d: "Static pages, tiny JS, instant results." },
          { icon: ShieldCheck, t: "Private by design", d: "Text + images processed in your browser." },
          { icon: Smartphone, t: "Mobile first", d: "Clean modern UI with dark mode." },
        ].map((f) => (
          <div key={f.t} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <f.icon size={20} className="text-indigo-600" />
            <p className="mt-2 font-semibold">{f.t}</p>
            <p className="mt-1 text-sm text-slate-500">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
