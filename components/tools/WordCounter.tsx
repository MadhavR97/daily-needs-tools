"use client";
import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function WordCounter() {
  const [t, setT] = useState("Paste your text here to count words instantly. Everything stays private in your browser.");
  const s = useMemo(() => {
    const words = (t.trim().match(/\S+/g) || []).length;
    const chars = t.length, noSpace = t.replace(/\s/g, "").length;
    const sentences = (t.match(/[.!?]+/g) || []).length;
    const paras = t.trim() ? t.trim().split(/\n+/).length : 0;
    return { words, chars, noSpace, sentences, paras, read: Math.ceil(words / 200) };
  }, [t]);
  return (
    <Card><CardContent className="pt-5">
      <Textarea rows={8} value={t} onChange={(e) => setT(e.target.value)} placeholder="Type or paste…" />
      <div className="mt-3 grid grid-cols-3 gap-2 text-center sm:grid-cols-6">
        {[[s.words, "Words"], [s.chars, "Chars"], [s.noSpace, "No space"], [s.sentences, "Sentences"], [s.paras, "Paras"], [`${s.read}m`, "Read"]].map(([v, l]) => (
          <div key={l as string} className="rounded-xl bg-slate-50 p-2 dark:bg-slate-800/60">
            <p className="font-bold">{v}</p><p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}
