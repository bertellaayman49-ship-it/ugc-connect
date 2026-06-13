import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // تعديل النوع هنا ليصبح Promise
) {
  try {
    // فك الـ Promise الخاص بالـ params أولاً
    const { id } = await params;
    
    const body = await request.json();
    const { status } = body;

    if (!status || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
    }

    const updatedContent = await prisma.content.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "حدث خطأ في السيرفر" }, { status: 500 });
  }
}