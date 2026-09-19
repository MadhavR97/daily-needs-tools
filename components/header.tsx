import Link from "next/link";
import { Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Wrench size={18} />
          </span>
          <span className="text-lg">DailyNeeds<span className="text-indigo-600 dark:text-indigo-400">Tools</span></span>
        </Link>
        <nav className="ml-6 hidden items-center gap-5 text-sm text-slate-600 md:flex dark:text-slate-300">
          <Link href="/#tools" className="hover:text-indigo-600">Tools</Link>
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          <Link href="/about" className="hover:text-indigo-600">About</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/#tools" className="hidden rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium sm:block dark:bg-slate-800">
            All tools
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
