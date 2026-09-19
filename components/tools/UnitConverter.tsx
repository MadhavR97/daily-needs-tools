"use client";
import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const groups: Record<string, { u: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  Length: [
    { u: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { u: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { u: "m", toBase: (v) => v, fromBase: (v) => v },
    { u: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { u: "inch", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { u: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { u: "mile", toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
  ],
  Weight: [
    { u: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { u: "kg", toBase: (v) => v, fromBase: (v) => v },
    { u: "lbs", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { u: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ],
  Temperature: [
    { u: "C", toBase: (v) => v, fromBase: (v) => v },
    { u: "F", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
    { u: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
};

export function UnitConverter() {
  const [g, setG] = useState("Length");
  const [val, setVal] = useState("100");
  const [from, setFrom] = useState("cm");
  const units = groups[g];
  const v = parseFloat(val);
  const base = !isNaN(v) ? (units.find((x) => x.u === from)?.toBase(v) ?? NaN) : NaN;
  return (
    <Card><CardContent className="pt-5">
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Category</Label><Select value={g} onChange={(e) => { setG(e.target.value); setFrom(groups[e.target.value][0].u); }}>
          {Object.keys(groups).map((k) => <option key={k} value={k}>{k}</option>)}
        </Select></div>
        <div><Label>Value</Label><Input value={val} onChange={(e) => setVal(e.target.value)} inputMode="decimal" /></div>
        <div><Label>From</Label><Select value={from} onChange={(e) => setFrom(e.target.value)}>
          {units.map((u) => <option key={u.u} value={u.u}>{u.u}</option>)}
        </Select></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {units.map((u) => (
          <div key={u.u} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
            <p className="font-bold">{isNaN(base) ? "—" : u.fromBase(base).toLocaleString(undefined, { maximumFractionDigits: 4 })} {u.u}</p>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}
