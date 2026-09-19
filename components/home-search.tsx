"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function HomeSearch() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const list = useMemo(() => {
    return TOOLS.filter((t) => {
      const okCat = cat === "All" || t.category === cat;
      const s = q.trim().toLowerCase();
      const okQ = !s || t.title.toLowerCase().includes(s) || t.short.toLowerCase().includes(s) || t.keywords.some((k) => k.includes(s));
      return okCat && okQ;
    });
  }, [q, cat]);

  return (
    <div id="tools">
      <div className="relative mx-auto mt-6 max-w-xl">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools: age, image, qr, password…" className="h-12 !rounded-2xl pl-10 text-base" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition border",
              cat === c
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-8 text-center text-sm text-slate-500">No tools found. Try another keyword.</p>}
    </div>
  );
}
