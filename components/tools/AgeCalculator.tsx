"use client";
import { useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-01");
  const [out, setOut] = useState("");
  function calc() {
    const b = new Date(dob);
    const now = new Date();
    if (isNaN(+b) || b > now) return setOut("Enter a valid past date.");
    let y = now.getFullYear() - b.getFullYear();
    let m = now.getMonth() - b.getMonth();
    let d = now.getDate() - b.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const totalDays = Math.floor((+now - +b) / 86400000);
    const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
    if (next < now) next.setFullYear(now.getFullYear() + 1);
    const toNext = Math.ceil((+next - +now) / 86400000);
    setOut(`${y} years, ${m} months, ${d} days · ${totalDays.toLocaleString()} days total · next birthday in ${toNext} days`);
  }
  return (
    <Card><CardContent className="pt-5">
      <Label htmlFor="dob">Birth date</Label>
      <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <Button onClick={calc} className="mt-3 w-full">Calculate age</Button>
      {out && <p className="mt-4 rounded-xl bg-indigo-50 p-3 text-sm font-medium dark:bg-indigo-500/10">{out}</p>}
    </CardContent></Card>
  );
}
