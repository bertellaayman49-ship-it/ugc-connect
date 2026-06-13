"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// الـ Action القديم الخاص بالقبول والرفض
export async function updateContentStatus(contentId: string, status: "APPROVED" | "REJECTED") {
  await prisma.content.update({
    where: { id: contentId },
    data: { status },
  });
  revalidatePath("/content");
}

// الـ Action الجديد لإضافة فيديو
export async function createContent(formData: FormData) {
  const title = formData.get("title") as string;
  const videoUrl = formData.get("videoUrl") as string;

  // خطوة ذكية: بما أننا لم نربط نظام تسجيل الدخول (Auth) بعد،
  // سنبحث عن أول مستخدم في القاعدة لربط الفيديو به، وإذا لم نجد سننشئ مستخدماً تجريبياً.
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { email: "test@example.com", name: "صانع محتوى تجريبي" }
    });
  }

  // إدخال البيانات في جدول Content
  await prisma.content.create({
    data: {
      title,
      videoUrl,
      userId: user.id, // ربطه بالمستخدم
    },
  });

  revalidatePath("/content"); // تحديث صفحة الجدول
  redirect("/content"); // توجيه المستخدم لصفحة الجدول بعد الإرسال
}