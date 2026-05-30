import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req: Request) {
  try {
    const admin = await isAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const slab =
      await prisma.incentiveSlab.create({
        data: {
          minRange: body.minRange,
          maxRange: body.maxRange,
          incentivePerCar:
            body.incentivePerCar,
        },
      });

    return NextResponse.json(slab);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}