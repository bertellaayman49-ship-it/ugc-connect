import { prisma } from "@/lib/prisma";
import StatCard from "./components/StatCard";
import Link from "next/link";

export default async function Home() {
  // جلب إحصائيات المنصة كاملة بأمان من الـ DB
  const [usersCount, jobsCount, totalContent, pendingContent] = await Promise.all([
    prisma.user.count(),
    prisma.job.count(),
    prisma.content.count(),
    prisma.content.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="space-y-12 text-right" dir="rtl">
      {/* قسم الترحيب */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-3">مرحباً بك في منصة UGC Connect 🚀</h1>
        <p className="text-blue-100 max-w-2xl text-lg">المنصة الاحترافية للربط بين الشركات وصناع المحتوى لإنتاج فيديوهات UGC إعلانية عالية الأداء.</p>
      </div>

      {/* بطاقات الإحصائيات العامة للموقع */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">إحصائيات المنصة الحالية 📊</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="إجمالي المستخدمين" value={usersCount.toString()} colorClass="text-purple-600" />
          <StatCard title="الطلبات النشطة (Jobs)" value={jobsCount.toString()} colorClass="text-blue-600" />
          <StatCard title="إجمالي الفيديوهات المرفوعة" value={totalContent.toString()} colorClass="text-emerald-600" />
          <StatCard title="فيديوهات قيد الانتظار" value={pendingContent.toString()} colorClass="text-amber-600" />
        </div>
      </div>

      {/* أزرار الدخول السريع */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-lg text-slate-900">أنا صاحب شركة / عميل</h4>
          <p className="text-slate-500 text-sm">أنشر طلبات توظيف صناع المحتوى وتابع ميزانيتك.</p>
          <Link href="/client" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700">دخول لوحة العميل ←</Link>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-lg text-slate-900">أنا صانع محتوى (Creator)</h4>
          <p className="text-slate-500 text-sm">أرسل الفيديوهات التي قمت بتصويرها وتابع حالة القبول.</p>
          <Link href="/creator" className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700">دخول لوحة الصانع ←</Link>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-bold text-lg text-slate-900">إدارة المنصة (Admin)</h4>
          <p className="text-slate-500 text-sm">مراجعة طلبات الفيديوهات المرفوعة وقبولها أو رفضها.</p>
          <Link href="/content" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800">مراجعة الفيديوهات ←</Link>
        </div>
      </div>
    </div>
  );
}