import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-blue-400">UGC Connect 🔗</Link>
            <div className="flex gap-4 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-white transition">الرئيسية</Link>
              <Link href="/client" className="hover:text-white transition">لوحة العميل</Link>
              <Link href="/creator" className="hover:text-white transition">لوحة الصانع</Link>
              <Link href="/content" className="hover:text-white transition">مراجعة الإدارة</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}