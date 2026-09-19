"use client";
import { useState } from "react";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EXT: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

function fmt(bytes: number) {
  return bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

export function ImageTool() {
  const [preview, setPreview] = useState("");
  const [outUrl, setOutUrl] = useState("");
  const [origBytes, setOrigBytes] = useState(0);
  const [outBytes, setOutBytes] = useState(0);
  const [dims, setDims] = useState("");
  const [width, setWidth] = useState("800");
  const [quality, setQuality] = useState("80");
  const [format, setFormat] = useState("image/webp");
  const [targetKb, setTargetKb] = useState("");

  const ext = EXT[format] ?? "webp";
  const grew = origBytes > 0 && outBytes > origBytes;
  const savedPct =
    origBytes > 0 && outBytes > 0 && outBytes < origBytes
      ? Math.round((1 - outBytes / origBytes) * 100)
      : 0;

  async function onFile(f: File) {
    if (preview) URL.revokeObjectURL(preview);
    if (outUrl) URL.revokeObjectURL(outUrl);
    setPreview(URL.createObjectURL(f));
    setOutUrl("");
    setOrigBytes(f.size);
    setOutBytes(0);
    setDims("");
  }

  async function process() {
    if (!preview) return;
    const img = new Image();
    img.src = preview;
    await new Promise((r) => {
      img.onload = () => r(null);
    });
    const w = parseInt(width) || img.width;
    const scale = Math.min(1, w / img.width);
    const cw = Math.round(img.width * scale);
    const ch = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    canvas.getContext("2d")!.drawImage(img, 0, 0, cw, ch);
    let q = Math.min(100, Math.max(1, parseInt(quality) || 80)) / 100;
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
      blob = await new Promise((r) =>
        canvas.toBlob(r, format, format === "image/png" ? undefined : q)
      );
    }
    if (!blob) return;
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(URL.createObjectURL(blob));
    setOutBytes(blob.size);
    setDims(`${cw}×${ch}`);
  }

  return (
    <Card><CardContent className="space-y-3 pt-5">
      <Label>Upload image (stays on your device)</Label>
      <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div><Label>Max width px</Label><Input value={width} onChange={(e) => setWidth(e.target.value)} inputMode="numeric" /></div>
        <div>
          <Label>Quality % {format === "image/png" && "(PNG ignores)"}</Label>
          <Input value={quality} onChange={(e) => setQuality(e.target.value)} inputMode="numeric" disabled={format === "image/png"} />
        </div>
        <div><Label>Target KB (opt)</Label><Input value={targetKb} onChange={(e) => setTargetKb(e.target.value)} placeholder="e.g. 100" inputMode="decimal" /></div>
        <div><Label>Format</Label>
          <Select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="image/webp">WebP (smallest)</option><option value="image/jpeg">JPG (photos)</option><option value="image/png">PNG (lossless)</option>
          </Select>
        </div>
      </div>
      {format === "image/png" && (
        <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
          PNG is lossless — great for logos/text, but photos become much bigger than JPG/WebP. For photos use WebP or JPG.
        </p>
      )}
      <Button onClick={process} disabled={!preview} className="w-full">Resize + Compress</Button>

      {origBytes > 0 && (
        <div className={`rounded-xl p-3 text-sm font-medium ${grew ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300" : "bg-indigo-50 dark:bg-indigo-500/10"}`}>
          <p>
            Original: {fmt(origBytes)}
            {outBytes > 0 && <> → Output: {fmt(outBytes)}{dims ? ` · ${dims}` : ""}</>}
          </p>
          {outBytes > 0 && !grew && savedPct > 0 && (
            <p className="mt-0.5 text-xs opacity-80">{savedPct}% smaller. Good compression.</p>
          )}
          {grew && (
            <p className="mt-0.5 text-xs">
              Output is bigger than the original. Switch format to WebP or JPG (or lower quality / width) for real compression.
            </p>
          )}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {preview && <div><p className="text-xs font-medium">Original</p>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={preview} alt="original" className="mt-1 max-h-64 rounded-xl border object-contain" /></div>}
        {outUrl && <div><p className="text-xs font-medium">Optimized</p><img src={outUrl} alt="optimized" className="mt-1 max-h-64 rounded-xl border object-contain" />
          <a href={outUrl} download={`optimized.${ext}`} className="mt-2 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Download .{ext}</a></div>}
      </div>
    </CardContent></Card>
  );
}
