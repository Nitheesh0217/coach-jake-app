import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-black/95">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-50">Coach Jake Strength &amp; Conditioning</div>

        <div className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">YouTube</a>
          <a href="#" className="hover:text-white">Discord</a>
        </div>
      </div>
    </footer>
  );
}
