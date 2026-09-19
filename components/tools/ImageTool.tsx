"use client";
import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ImageTool() {
  const [preview, setPreview] = useState("");
  const [outUrl, setOutUrl] = useState("");
  const [info, setInfo] = useState("");
  const [width, setWidth] = useState("800");
  const [quality, setQuality] = useState("80");
  const [format, setFormat] = useState("image/webp");
  const [targetKb, setTargetKb] = useState("");

  async function onFile(f: File) {
    const url = URL.createObjectURL(f);
    setPreview(url); setOutUrl(""); setInfo(`${f.name} · ${(f.size / 1024).toFixed(1)} KB`);
  }

  async function process() {
    if (!preview) return;
    const img = new Image();
    img.src = preview;
    await new Promise((r) => { img.onload = () => r(null); });
    const w = parseInt(width) || img.width;
    const scale = Math.min(1, w / img.width);
    const cw = Math.round(img.width * scale), ch = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = cw; canvas.height = ch;
    canvas.getContext("2d")!.drawImage(img, 0, 0, cw, ch);
    let q = (parseInt(quality) || 80) / 100;
    const tkb = parseFloat(targetKb);
    let blob: Blob | null = null;
    if (tkb && format !== "image/png") {
      for (let i = 0; i < 6; i++) {
        blob = await new Promise((r) => canvas.toBlob(r, format, q));
        if (!blob) break;
        if (blob.size / 1024 <= tkb || q <= 0.2) break;
        q -= 0.12;
      }
    } else {
      blob = await new Promise((r) => canvas.toBlob(r, format, format === "image/png" ? undefined : q));
    }
    if (!blob) return;
    setOutUrl(URL.createObjectURL(blob));
    setInfo(`${cw}×${ch} · ${(blob.size / 1024).toFixed(1)} KB · quality ${Math.round(q * 100)}%`);
  }

  return (
    <Card><CardContent className="space-y-3 pt-5">
      <Label>Upload image (stays on your device)</Label>
      <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div><Label>Max width px</Label><Input value={width} onChange={(e) => setWidth(e.target.value)} inputMode="numeric" /></div>
        <div><Label>Quality %</Label><Input value={quality} onChange={(e) => setQuality(e.target.value)} inputMode="numeric" /></div>
        <div><Label>Target KB (opt)</Label><Input value={targetKb} onChange={(e) => setTargetKb(e.target.value)} placeholder="e.g. 100" inputMode="decimal" /></div>
        <div><Label>Format</Label>
          <Select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option>
          </Select>
        </div>
      </div>
      <Button onClick={process} disabled={!preview} className="w-full">Resize + Compress</Button>
      {info && <p className="text-sm text-slate-500">{info}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {preview && <div><p className="text-xs font-medium">Original</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={preview} alt="original" className="mt-1 max-h-64 rounded-xl border object-contain" /></div>}
        {outUrl && <div><p className="text-xs font-medium">Optimized</p><img src={outUrl} alt="optimized" className="mt-1 max-h-64 rounded-xl border object-contain" />
          <a href={outUrl} download="optimized.webp" className="mt-2 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Download</a></div>}
      </div>
    </CardContent></Card>
  );
}
