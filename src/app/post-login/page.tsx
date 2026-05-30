import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/syncUser";

export default async function PostLoginPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await syncUser();

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/sales");
}