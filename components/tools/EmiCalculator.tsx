"use client";
import { useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmiCalculator() {
  const [p, setP] = useState("10000");
  const [rate, setRate] = useState("8");
  const [yrs, setYrs] = useState("3");
  const [out, setOut] = useState("");
  function calc() {
    const P = parseFloat(p), annual = parseFloat(rate), y = parseFloat(yrs);
    if (!P || !y || isNaN(annual)) return setOut("Enter valid numbers.");
    const r = annual / 1200, n = Math.round(y * 12);
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setOut(`EMI: $${emi.toFixed(2)}/mo · Total: $${(emi * n).toFixed(2)} · Interest: $${(emi * n - P).toFixed(2)} over ${n} months`);
  }
  return (
    <Card><CardContent className="pt-5">
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Amount ($)</Label><Input value={p} onChange={(e) => setP(e.target.value)} inputMode="decimal" /></div>
        <div><Label>Rate %/yr</Label><Input value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" /></div>
        <div><Label>Years</Label><Input value={yrs} onChange={(e) => setYrs(e.target.value)} inputMode="decimal" /></div>
      </div>
      <Button onClick={calc} className="mt-3 w-full">Calculate EMI</Button>
      {out && <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm font-medium dark:bg-indigo-500/10">{out}</p>}
      <p className="mt-2 text-xs text-slate-400">Estimate only, not financial advice.</p>
    </CardContent></Card>
  );
}
