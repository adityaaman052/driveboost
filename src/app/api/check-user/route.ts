import { prisma } from "@/lib/prisma";

import {
  auth,
} from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({
      exists: false,
    });
  }

  const user =
    await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

  if (!user) {
    return NextResponse.json({
      exists: false,
    });
  }

  return NextResponse.json({
    exists: true,
    role: user.role,
  });
}