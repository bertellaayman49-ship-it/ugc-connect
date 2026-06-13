import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const updatedContent = await prisma.content.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updatedContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل تحديث الحالة" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.content.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "تم الحذف بنجاح" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "فشل حذف المحتوى" }, { status: 500 });
  }
}