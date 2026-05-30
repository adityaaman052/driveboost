import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function isAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return user?.role === "ADMIN";
}