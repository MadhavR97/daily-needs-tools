"use client";
import { useEffect, useRef, useState } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CountdownTimer() {
  const [min, setMin] = useState("5");
  const [sec, setSec] = useState("0");
  const [left, setLeft] = useState(0);
  const [run, setRun] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!run) return;
    ref.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) { setRun(false); try { new AudioContext().close(); } catch {} alert("Time is up!"); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [run]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <Card><CardContent className="pt-5 text-center">
      <p className="font-mono text-6xl font-bold tabular-nums">{mm}:{ss}</p>
      <div className="mx-auto mt-4 grid max-w-xs grid-cols-2 gap-3">
        <div><Label>Minutes</Label><Input value={min} onChange={(e) => setMin(e.target.value)} inputMode="numeric" /></div>
        <div><Label>Seconds</Label><Input value={sec} onChange={(e) => setSec(e.target.value)} inputMode="numeric" /></div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <Button onClick={() => { setLeft((parseInt(min) || 0) * 60 + (parseInt(sec) || 0)); setRun(true); }}>Start</Button>
        <Button variant="secondary" onClick={() => setRun(false)}>Pause</Button>
        <Button variant="secondary" onClick={() => { setRun(false); setLeft(0); }}>Reset</Button>
      </div>
    </CardContent></Card>
  );
}
