import { createContent } from "@/app/actions/content"; // تأكد من مسار الـ action الخاص بك
import Link from "next/link";

export default function NewContentPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 px-4 text-right" dir="rtl">
      <div>
        <Link href="/content" className="text-sm text-blue-600 hover:underline">
          ← العودة لطلبات المحتوى
        </Link>
        <h1 className="text-3xl font-bold text-slate-950 mt-2">إرسال فيديو جديد (UGC)</h1>
        <p className="text-slate-500 text-sm">أدخل تفاصيل الفيديو ليتم مراجعته من قِبل الإدارة.</p>
      </div>

      <form action={createContent} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">عنوان الفيديو</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="مثال: مراجعة منتج الشامبو الطبيعي" 
            className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">رابط الفيديو المباشر</label>
          <input 
            type="url" 
            name="videoUrl" 
            required 
            placeholder="https://example.com/my-video.mp4" 
            className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-left"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          نشر ومراجعة 🚀
        </button>
      </form>
    </div>
  );
}