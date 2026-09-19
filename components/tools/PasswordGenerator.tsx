"use client";
import { useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PasswordGenerator() {
  const [len, setLen] = useState("16");
  const [sym, setSym] = useState(true);
  const [num, setNum] = useState(true);
  const [out, setOut] = useState("");
  function gen() {
    const n = Math.min(64, Math.max(4, parseInt(len) || 16));
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    if (num) chars += "23456789";
    if (sym) chars += "!@#$%^&*-_+=";
    const buf = new Uint32Array(n);
    crypto.getRandomValues(buf);
    setOut(Array.from(buf, (x) => chars[x % chars.length]).join(""));
  }
  async function copy() { if (out) await navigator.clipboard.writeText(out).catch(() => {}); }
  return (
    <Card><CardContent className="pt-5">
      <Label>Length (4–64): {len}</Label>
      <Input type="range" min={4} max={64} value={len} onChange={(e) => setLen(e.target.value)} />
      <div className="mt-3 flex gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={num} onChange={(e) => setNum(e.target.checked)} /> Numbers</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={sym} onChange={(e) => setSym(e.target.checked)} /> Symbols</label>
      </div>
      <Button onClick={gen} className="mt-3 w-full">Generate secure password</Button>
      {out && (
        <div className="mt-3 flex gap-2">
          <code className="flex-1 break-all rounded-xl bg-slate-950 p-3 font-mono text-sm text-lime-300">{out}</code>
          <Button variant="secondary" onClick={copy}>Copy</Button>
        </div>
      )}
    </CardContent></Card>
  );
}
