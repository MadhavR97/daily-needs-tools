import Link from "next/link";
import { Cake, Percent, Tag, Heart, Banknote, Type, CaseSensitive, KeyRound, QrCode, Timer, Image as ImageIcon, Ruler, LucideIcon } from "lucide-react";
import type { ToolDef } from "@/lib/tools";

const icons: Record<string, LucideIcon> = {
  cake: Cake, percent: Percent, tag: Tag, heart: Heart, banknote: Banknote,
  type: Type, case: CaseSensitive, key: KeyRound, qr: QrCode, timer: Timer,
  image: ImageIcon, ruler: Ruler,
};

export function ToolIcon({ name, size = 20 }: { name: string; size?: number }) {
  const I = icons[name] ?? Ruler;
  return <I size={size} />;
}

export function ToolCard({ tool }: { tool: ToolDef }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
        <ToolIcon name={tool.icon} />
      </div>
      <h3 className="mt-3 font-semibold leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300">{tool.title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tool.short}</p>
      <span className="mt-3 inline-block text-xs font-medium text-slate-400">{tool.category}</span>
    </Link>
  );
}
