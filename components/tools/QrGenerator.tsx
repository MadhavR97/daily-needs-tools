"use client";
import { useState } from "react";
import QRCode from "qrcode";
import { Textarea, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function QrGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("256");
  const [url, setUrl] = useState("");
  async function gen() {
    try { setUrl(await QRCode.toDataURL(text || " ", { width: parseInt(size) || 256, margin: 2 })); }
    catch { setUrl(""); }
  }
  return (
    <Card><CardContent className="pt-5">
      <Label>Text / URL / WiFi</Label>
      <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-3 flex gap-2">
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="128">128px</option><option value="256">256px</option><option value="512">512px</option>
        </Select>
        <Button onClick={gen} className="flex-1">Generate QR</Button>
      </div>
      {url && (
        <div className="mt-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="QR code" className="mx-auto rounded-xl border" width={256} height={256} />
          <a href={url} download="qr.png" className="mt-2 inline-block rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium dark:bg-slate-800">Download PNG</a>
        </div>
      )}
    </CardContent></Card>
  );
}
