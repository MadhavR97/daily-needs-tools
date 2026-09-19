// Future AdSense slot. Renders a lightweight placeholder now to keep CLS stable and UI clean.
// To enable real ads: set NEXT_PUBLIC_ADSENSE_ID and uncomment the <ins> block in AdSenseScript.
export function AdUnit({ slot = "display", label = "Advertisement" }: { slot?: string; label?: string }) {
  return (
    <div data-ad-slot={slot} className="flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900/40">
      {label} · AdSense ready
    </div>
  );
}
