import Link from "next/link";

const posts = [
  { slug: "how-to-compress-image-to-100kb", title: "How to Compress Image to 100KB Free", desc: "Use our free image compressor to hit exact KB targets without losing quality." },
  { slug: "how-to-calculate-percentage", title: "How to Calculate Percentage (3 Formulas)", desc: "X% of Y, increase and decrease explained with examples." },
  { slug: "how-to-create-qr-code", title: "How to Create a QR Code for URL/WiFi", desc: "Generate, download and print QR codes in seconds." },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-extrabold">Blog</h1>
      <p className="mt-2 text-slate-500">How-to guides that link to our free tools.</p>
      <div className="mt-6 space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-2xl border p-5 hover:border-indigo-300 dark:border-slate-800">
            <p className="font-bold">{p.title}</p>
            <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
