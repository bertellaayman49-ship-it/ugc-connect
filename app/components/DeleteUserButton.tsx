"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // نافذة تأكيد قبل الحذف
    const confirmed = confirm("هل أنت متأكد أنك تريد حذف هذا المستخدم؟");
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh(); // تحديث الصفحة لإخفاء المستخدم المحذوف
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ في الاتصال");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50"
    >
      {isDeleting ? "جاري الحذف..." : "حذف"}
    </button>
  );
}