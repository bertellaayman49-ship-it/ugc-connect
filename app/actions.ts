"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const budget = Number(formData.get("budget"));

  await prisma.job.create({
    data: {
      title,
      budget,
    },
  });

  revalidatePath("/client"); // لتحديث الصفحة وإظهار الرقم الجديد فوراً
}