import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StatCard from "../components/StatCard";

export default async function CreatorDashboard() {
  // جلب البيانات الإجمالية للفيديوهات الخاصة بالصناع
  const [pending, approved, rejected] = await Promise.all([
    prisma.content.count({ where: { status: "PENDING" } }),
    prisma.content.count({ where: { status: "APPROVED" } }),
    prisma.content.count({ where: { status: "REJECTED" } }),
  ]);

  // جلب آخر 5 فيديوهات تم رفعها للعرض
  const myVideos = await prisma.content.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">لوحة صانع المحتوى 🤳</h2>
          <p className="text-slate-500 text-sm">تابع أعمالك وفيديوهاتك المرفوعة للمراجعة.</p>
        </div>
        <Link href="/content/new" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition shadow-sm">
          + إرسال فيديو جديد للأدمن
        </Link>
      </div>

      {/* بطاقات أداء الصانع */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="فيديوهات مقبولة وضمن الأرباح" value={approved.toString()} colorClass="text-green-600" />
        <StatCard title="فيديوهات قيد المراجعة حالياً" value={pending.toString()} colorClass="text-amber-600" />
        <StatCard title="فيديوهات مرفوضة للتعديل" value={rejected.toString()} colorClass="text-red-600" />
      </div>

      {/* قائمة فيديوهاتي */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-lg text-slate-900 mb-4">آخر الفيديوهات التي قمت برفعها</h3>
        {myVideos.length === 0 ? (
          <p className="text-slate-400 text-sm">لم تقم برفع أي فيديو بعد.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {myVideos.map((vid) => (
              <div key={vid.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800">{vid.title}</p>
                  <a href={vid.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">رابط الملف 🔗</a>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  vid.status === "APPROVED" ? "bg-green-100 text-green-800" :
                  vid.status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {vid.status === "APPROVED" ? "مقبول" : vid.status === "REJECTED" ? "مرفوض" : "قيد الانتظار"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}