import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-bold">DailyNeedsTools</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Free everyday tools. Fast, private, no signup. Runs in your browser.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Tools</p>
          <div className="mt-2 flex flex-col gap-1.5 text-slate-500">
            <Link href="/tools/age-calculator">Age Calculator</Link>
            <Link href="/tools/word-counter">Word Counter</Link>
            <Link href="/tools/image-resizer-compressor">Image Compressor</Link>
            <Link href="/tools/qr-generator">QR Generator</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Legal</p>
          <div className="mt-2 flex flex-col gap-1.5 text-slate-500">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
        © {new Date().getFullYear()} DailyNeedsTools · Free forever core tools
      </div>
    </footer>
  );
}
