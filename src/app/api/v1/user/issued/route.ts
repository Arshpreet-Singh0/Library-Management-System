import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        // const session = await getServerSession(authOptions);
        // if (!session || session.user.id) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }

        const books = await prisma.bookIssue.findMany({
            where: {
                userId : "c745a398-161e-4fd7-b72e-2e8bdfd8f044",
            },
            include: {
                book: {
                    select : {
                        isbn : true,
                        title : true,
                        authors : true,
                        coverImage : true,
                    }
                }
            }
        })
        return NextResponse.json(books);
        
    } catch (error) {
        console.error("Error getting returned books:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
        
    }
}