import prisma from "@/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    return NextResponse.json({
      message: "Error in fetching product details",
      success: false,
    });
  }
}
