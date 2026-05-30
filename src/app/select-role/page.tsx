import { prisma } from "@/lib/prisma";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function SelectRolePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  async function updateRole(
    formData: FormData
  ) {
    "use server";

    const { userId } = await auth();

    const user = await currentUser();

    if (!userId || !user) {
      redirect("/sign-in");
    }

    const role =
      formData.get("role") as string;

    await prisma.user.upsert({
      where: {
        clerkUserId: userId,
      },

      update: {
        role:
          role === "ADMIN"
            ? "ADMIN"
            : "SALES_OFFICER",

        name:
          user.fullName ||
          user.firstName ||
          user.username ||
          user.emailAddresses[0]
            ?.emailAddress ||
          "User",

        email:
          user.emailAddresses[0]
            ?.emailAddress ||
          `${userId}@demo.com`,
      },

      create: {
        clerkUserId: userId,

        name:
          user.fullName ||
          user.firstName ||
          user.username ||
          user.emailAddresses[0]
            ?.emailAddress ||
          "User",

        email:
          user.emailAddresses[0]
            ?.emailAddress ||
          `${userId}@demo.com`,

        role:
          role === "ADMIN"
            ? "ADMIN"
            : "SALES_OFFICER",
      },
    });

    if (role === "ADMIN") {
      redirect("/admin");
    }

    redirect("/sales");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Choose Your Role
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Continue as Admin or
          Sales Officer
        </p>

        <form
          action={updateRole}
          className="space-y-4"
        >
          <button
            type="submit"
            name="role"
            value="ADMIN"
            className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:opacity-90"
          >
            Continue as Admin
          </button>

          <button
            type="submit"
            name="role"
            value="SALES_OFFICER"
            className="w-full rounded-xl border border-black px-4 py-3 transition hover:bg-gray-100"
          >
            Continue as Sales
            Officer
          </button>
        </form>
      </div>
    </div>
  );
}