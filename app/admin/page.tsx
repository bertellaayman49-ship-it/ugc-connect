export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-8">لوحة تحكم الإدارة 🛡️</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-700">
          <h3 className="text-sm font-medium">بلاغات مخالفة</h3>
          <span className="text-3xl font-black">12</span>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-700">
          <h3 className="text-sm font-medium">مستخدمون جدد</h3>
          <span className="text-3xl font-black">45</span>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-green-700">
          <h3 className="text-sm font-medium">مشاريع اليوم</h3>
          <span className="text-3xl font-black">89</span>
        </div>
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 text-yellow-700">
          <h3 className="text-sm font-medium">سحوبات معلقة</h3>
          <span className="text-3xl font-black">3</span>
        </div>
      </div>
    </div>
  );
}