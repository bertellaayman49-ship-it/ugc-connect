import { prisma } from "@/lib/prisma";
import { createJob } from "../actions";
import StatCard from "../components/StatCard";

export default async function ClientDashboard() {
  const jobsCount = await prisma.job.count();
  const allJobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8 text-right" dir="rtl">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">لوحة التحكم للعملاء 👋</h2>
        <p className="text-slate-500 text-sm">أنشئ طلبات صناعة محتوى جديدة وراقب مشاريعك.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="الطلبات النشطة" value={jobsCount.toString()} colorClass="text-blue-600" />
        <StatCard title="إجمالي الميزانية المستثمرة" value={`${jobsCount * 150}$`} colorClass="text-emerald-600" />
        <StatCard title="صناع محتوى متصلين" value="4" colorClass="text-purple-600" />
      </div>

      {/* فورم إضافة طلب وظيفة جديد */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">➕ نشر طلب توظيف صانع محتوى جديد</h3>
        <form action={createJob} className="flex flex-col md:flex-row gap-4">
          <input name="title" placeholder="مثال: مطلوب فتاة لتصوير إعلان كريم بشرة" className="border border-slate-300 p-2.5 rounded-xl flex-1 outline-none focus:ring-2 focus:ring-blue-500" required />
          <input name="budget" type="number" placeholder="الميزانية ($)" className="border border-slate-300 p-2.5 rounded-xl w-full md:w-36 outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">نشر الطلب الآن</button>
        </form>
      </div>

      {/* جدول الطلبات المنشورة */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">💼 طلباتك الحالية في السوق</h3>
        {allJobs.length === 0 ? (
          <p className="text-slate-400 text-sm">لا توجد طلبات منشورة حالياً، استخدم الفورم في الأعلى للإضافة.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">عنوان الطلب</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">الميزانية المقترحة</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {allJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-bold">{job.budget}$</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">مفتوح للمبدعين</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}