import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // استعمال (prisma as any) لتجاوز خطأ الكاش اللعين
    const contents = await (prisma as any).content.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل جلب المحتوى" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, videoUrl, userId } = body;

    if (!title || !videoUrl || !userId) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    // نفس الشيء هنا لتفادي الخطأ الثاني تماماً
    const newContent = await (prisma as any).content.create({
      data: { title, videoUrl, userId },
    });

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل إضافة المحتوى" }, { status: 500 });
  }
}