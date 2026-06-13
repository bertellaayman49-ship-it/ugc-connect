import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ContentActions from "../components/ContentActions";

interface ContentItem {
  id: string;
  title: string;
  videoUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: { name: string | null; email: string; };
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const statusFilter = params.status || "";

  const items = await prisma.content.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
      ...(statusFilter ? { status: statusFilter as any } : {}),
    },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  }) as unknown as ContentItem[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">طلبات المحتوى (UGC)</h1>
          <p className="text-slate-500 text-sm">راجع الفيديوهات المرفوعة وابحث عنها بسهولة.</p>
        </div>
        <Link href="/content/new" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm whitespace-nowrap">
          + إرسال فيديو جديد
        </Link>
      </div>

      {/* فورم البحث والفلترة */}
      <form className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          name="q" 
          defaultValue={query}
          placeholder="ابحث بعنوان الفيديو..." 
          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          name="status" 
          defaultValue={statusFilter}
          className="border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">جميع الحالات</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="APPROVED">مقبول</option>
          <option value="REJECTED">مرفوض</option>
        </select>
        <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition">
          بحث
        </button>
      </form>

      {/* الجدول */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <p className="p-10 text-slate-400 text-center font-medium">لا توجد نتائج تطابق بحثك حالياً.</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 text-right">
            <thead className="bg-slate-50/70">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">عنوان الفيديو</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">صاحب المحتوى</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الرابط المباشر</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">الحالة الحالية</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">إجراءات المراجعة</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">{item.user?.name || item.user?.email || "مستخدم مجهول"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={item.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                      فتح الرابط 🔗
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "APPROVED" ? "bg-green-50 text-green-700 border border-green-200" :
                      item.status === "REJECTED" ? "bg-red-50 text-red-700 border border-red-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {item.status === "APPROVED" ? "مقبول" : item.status === "REJECTED" ? "مرفوض" : "قيد الانتظار"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <ContentActions contentId={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}