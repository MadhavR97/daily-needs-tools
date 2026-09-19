"use client";
import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BmiCalculator() {
  const [sys, setSys] = useState("metric");
  const [h, setH] = useState("170");
  const [w, setW] = useState("65");
  const [out, setOut] = useState("");
  function calc() {
    const height = parseFloat(h), weight = parseFloat(w);
    if (!height || !weight) return setOut("Enter valid height and weight.");
    let bmi: number;
    if (sys === "metric") bmi = weight / Math.pow(height / 100, 2);
    else bmi = (weight / Math.pow(height, 2)) * 703;
    const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
    setOut(`BMI: ${bmi.toFixed(1)} · ${cat} (healthy 18.5–24.9)`);
  }
  return (
    <Card><CardContent className="pt-5">
      <Label>System</Label>
      <Select value={sys} onChange={(e) => setSys(e.target.value)}>
        <option value="metric">Metric (cm, kg)</option>
        <option value="imperial">Imperial (in, lbs)</option>
      </Select>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div><Label>{sys === "metric" ? "Height (cm)" : "Height (in)"}</Label><Input value={h} onChange={(e) => setH(e.target.value)} inputMode="decimal" /></div>
        <div><Label>{sys === "metric" ? "Weight (kg)" : "Weight (lbs)"}</Label><Input value={w} onChange={(e) => setW(e.target.value)} inputMode="decimal" /></div>
      </div>
      <Button onClick={calc} className="mt-3 w-full">Calculate BMI</Button>
      {out && <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm font-medium dark:bg-indigo-500/10">{out}</p>}
    </CardContent></Card>
  );
}
