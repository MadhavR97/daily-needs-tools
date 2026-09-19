"use client";
import { useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DiscountCalculator() {
  const [price, setPrice] = useState("100");
  const [off, setOff] = useState("25");
  const [out, setOut] = useState("");
  function calc() {
    const p = parseFloat(price), d = parseFloat(off);
    if (isNaN(p) || isNaN(d)) return setOut("Enter valid numbers.");
    const save = (p * d) / 100;
    setOut(`Sale price: $${(p - save).toFixed(2)} · You save: $${save.toFixed(2)} (${d}%)`);
  }
  return (
    <Card><CardContent className="pt-5">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Original price ($)</Label><Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" /></div>
        <div><Label>Discount %</Label><Input value={off} onChange={(e) => setOff(e.target.value)} inputMode="decimal" /></div>
      </div>
      <Button onClick={calc} className="mt-3 w-full">Calculate sale price</Button>
      {out && <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm font-medium dark:bg-indigo-500/10">{out}</p>}
    </CardContent></Card>
  );
}
