"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ContentActions({ contentId }: { contentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: "APPROVED" | "REJECTED") => {
    setLoading(true);
    const toastId = toast.loading("جاري تحديث الحالة...");
    
    try {
      const res = await fetch(`/api/content/${contentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(newStatus === "APPROVED" ? "تم قبول المحتوى!" : "تم رفض المحتوى!", { id: toastId });
        router.refresh();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("فشل في تحديث الحالة", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المحتوى نهائياً؟")) return;
    setLoading(true);
    const toastId = toast.loading("جاري الحذف...");

    try {
      const res = await fetch(`/api/content/${contentId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("تم الحذف نهائياً", { id: toastId });
        router.refresh();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("فشل في عملية الحذف", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-end">
      <button 
        onClick={() => updateStatus("APPROVED")} 
        disabled={loading} 
        className="text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition disabled:opacity-50"
      >
        قبول
      </button>
      <button 
        onClick={() => updateStatus("REJECTED")} 
        disabled={loading} 
        className="text-amber-600 hover:bg-amber-50 px-2 py-1 rounded-md transition disabled:opacity-50"
      >
        رفض
      </button>
      <button 
        onClick={deleteContent} 
        disabled={loading} 
        className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition disabled:opacity-50 font-bold"
      >
        حذف
      </button>
    </div>
  );
}