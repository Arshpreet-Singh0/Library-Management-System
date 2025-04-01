import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      isbn : string;
    }>
  }
) {
  try {
    const { isbn } = await params;
    const book = await prisma.book.findUnique({
      where: {
        isbn,
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
