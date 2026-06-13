import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col justify-between border-l border-slate-800 p-6 h-screen sticky top-0 z-50">
      
      {/* الجزء العلوي */}
      <div className="flex flex-col gap-8">
        <div className="text-2xl font-black tracking-wider text-blue-500 border-b border-slate-800 pb-4 text-center">
          UGC CONNECT
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 hover:bg-slate-900 p-3 rounded-lg font-medium transition-all duration-200 hover:text-blue-400">
            <span>🏠</span> الرئيسية
          </Link>
          <Link href="/users" className="flex items-center gap-3 hover:bg-slate-900 p-3 rounded-lg font-medium transition-all duration-200 hover:text-blue-400">
            <span>👥</span> إدارة المستخدمين
          </Link>
          <Link href="/content" className="flex items-center gap-3 hover:bg-slate-900 p-3 rounded-lg font-medium transition-all duration-200 hover:text-blue-400">
            <span>🎬</span> طلبات المحتوى
          </Link>
        </nav>
      </div>

      {/* الجزء السفلي */}
      <div className="text-xs text-slate-500 text-center border-t border-slate-800 pt-4">
        <p>UGC Connect Platform</p>
        <p className="mt-1">النسخة النهائية v1.0.0</p>
      </div>
      
    </aside>
  );
}