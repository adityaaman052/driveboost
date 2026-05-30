import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    const clerkUser = await fetch(
      `https://api.clerk.com/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    ).then((res) => res.json());

    const newUser = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser.email_addresses[0].email_address,
        name: `${clerkUser.first_name || ""} ${
          clerkUser.last_name || ""
        }`,
        role: "SALES_OFFICER",
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}