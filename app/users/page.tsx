import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client"; // استيراد التايب الرسمي من Prisma

export default async function UsersPage() {
  // جلب البيانات مباشرة من السيرفر
  const users: User[] = await prisma.user.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">قائمة المستخدمين</h1>
      
      {users.length === 0 ? (
        <p>لا يوجد مستخدمين حالياً.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user: User) => (
            <li key={user.id} className="p-4 border rounded shadow-sm">
              <p><strong>الاسم:</strong> {user.name || "لا يوجد اسم"}</p>
              <p><strong>الإيميل:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}