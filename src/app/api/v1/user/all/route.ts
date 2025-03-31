import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
            }
        });
        return NextResponse.json({ message: "Users retrieved successfully", users, success: true }, { status: 200 });

    } catch (error) {
        console.error("Error getting user:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}