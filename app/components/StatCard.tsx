export default function StatCard({ title, value, colorClass }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-slate-400 mb-2">{title}</h3>
      <span className={`text-5xl font-extrabold ${colorClass}`}>{value}</span>
    </div>
  );
}