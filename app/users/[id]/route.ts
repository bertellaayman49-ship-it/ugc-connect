import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // حذف المستخدم من قاعدة البيانات
    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "تم حذف المستخدم بنجاح" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}