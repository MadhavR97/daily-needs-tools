"use client";
import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PercentageCalculator() {
  const [mode, setMode] = useState("x-of-y");
  const [a, setA] = useState("20");
  const [b, setB] = useState("150");
  const [out, setOut] = useState("");
  function calc() {
    const x = parseFloat(a), y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return setOut("Enter valid numbers.");
    if (mode === "x-of-y") setOut(`${x}% of ${y} = ${(y * x / 100).toLocaleString()}`);
    if (mode === "is-what") setOut(`${x} is ${y === 0 ? "—" : ((x / y) * 100).toFixed(2)}% of ${y}`);
    if (mode === "inc") setOut(`Increase: ${(y + (y * x) / 100).toLocaleString()} ( +${((y * x) / 100).toLocaleString()} )`);
    if (mode === "dec") setOut(`Decrease: ${(y - (y * x) / 100).toLocaleString()} ( -${((y * x) / 100).toLocaleString()} )`);
  }
  return (
    <Card><CardContent className="pt-5">
      <Label>Mode</Label>
      <Select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="x-of-y">X% of Y</option>
        <option value="is-what">X is what % of Y</option>
        <option value="inc">Increase Y by X%</option>
        <option value="dec">Decrease Y by X%</option>
      </Select>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div><Label>X</Label><Input value={a} onChange={(e) => setA(e.target.value)} inputMode="decimal" /></div>
        <div><Label>Y</Label><Input value={b} onChange={(e) => setB(e.target.value)} inputMode="decimal" /></div>
      </div>
      <Button onClick={calc} className="mt-3 w-full">Calculate</Button>
      {out && <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm font-medium dark:bg-indigo-500/10">{out}</p>}
    </CardContent></Card>
  );
}
