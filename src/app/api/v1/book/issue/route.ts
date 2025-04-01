import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { bookId, userId, issueDays} = body;

        console.log(body);
        
        
        if (!bookId || !userId || !issueDays) {
            return NextResponse.json({ message: "Book ID and User ID are required" }, { status: 400 });
        }

        // Check if the book exists
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book || book.availableCopies==0) {
            return NextResponse.json({ message: "Book not found or not available" }, { status: 404 });
        }
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Check if the book is already issued
        const issuedBook = await prisma.bookIssue.findFirst({
            where: { 
                bookId,
                userId,
                returnDate : null
             },
        });
        if (issuedBook) {
            return NextResponse.json({ message: "Book is already issued to student" }, { status: 409 });
        }
        // Issue the book
        const issued = await prisma.bookIssue.create({
            data: {
                bookId,
                userId,
                dueDate : new Date(Date.now() + Number(issueDays) * 24 * 60 * 60 * 1000), // Set due date to 7 days from now
                issueDate: new Date(),
            },
        });

        await prisma.book.update({
            where : {
                id : bookId
            },
            data : {
                availableCopies : book.availableCopies-1,
            }
        })
        
        return NextResponse.json({ message: "Book issued successfully", issued, success : true }, { status: 201 });
    } catch (error) {
        console.error("Error issuing book:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
        
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const issuedBooks = await prisma.bookIssue.findMany({
            where : {
                status : "ACTIVE",
            },
            include: {
                book: true,
                user: true,
            },
        });
        return NextResponse.json({ message: "Issued books retrieved successfully", issuedBooks }, { status: 200 });
    } catch (error) {
        console.error("Error getting issued books:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}