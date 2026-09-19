"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function toTitle(s: string) { return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()); }
function toSentence(s: string) { return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()); }

export function CaseConverter() {
  const [t, setT] = useState("Hello World! Try converting THIS text.");
  const [copied, setCopied] = useState(false);
  const apply = (fn: (s: string) => string) => setT((v) => fn(v));
  async function copy() {
    await navigator.clipboard.writeText(t).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 1200);
  }
  return (
    <Card><CardContent className="pt-5">
      <Textarea rows={6} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => apply((s) => s.toUpperCase())}>UPPER</Button>
        <Button size="sm" variant="secondary" onClick={() => apply((s) => s.toLowerCase())}>lower</Button>
        <Button size="sm" variant="secondary" onClick={() => apply(toTitle)}>Title Case</Button>
        <Button size="sm" variant="secondary" onClick={() => apply(toSentence)}>Sentence case</Button>
        <Button size="sm" variant="secondary" onClick={() => setT("")}>Clear</Button>
        <Button size="sm" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
      </div>
    </CardContent></Card>
  );
}
