import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: clerkUser.id,
    },
  });

  if (existingUser) return existingUser;

  const newUser = await prisma.user.create({
    data: {
      clerkUserId: clerkUser.id,
      email:
        clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${
        clerkUser.lastName || ""
      }`,
      role: "SALES_OFFICER",
    },
  });

  return newUser;
}