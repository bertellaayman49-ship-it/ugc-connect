import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // 1. تحويله إلى Promise هنا
) {
  try {
    // 2. فك الـ Promise لجلب الـ id بأمان
    const { id } = await params;

    // القيام بعملية الحذف من قاعدة البيانات
    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء حذف المستخدم" }, { status: 500 });
  }
}