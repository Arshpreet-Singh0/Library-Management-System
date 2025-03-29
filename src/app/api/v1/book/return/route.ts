import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        // Check if the user is authenticated and has admin role
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { bookId, userId } = body;
        if (!bookId || !userId) {
            return NextResponse.json({ message: "Book ID and User ID are required" }, { status: 400 });
        }
        // Check if the book exists
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            return NextResponse.json({ message: "Book not found" }, { status: 404 });
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
                userId
            },

        });
        if (!issuedBook) {
            return NextResponse.json({ message: "Book is not issued to student" }, { status: 409 });
        }
        // Return the book
        const returned = await prisma.bookIssue.update({
            where: {
                id: issuedBook.id,
            },
            data: {
                returnDate: new Date(),
                status : "RETURNED",
            }
        });
        //update fine

        const currentDate = new Date();
        const dueDate = new Date(issuedBook.dueDate);
        const fine = Math.max(0, Math.floor((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))) * 10; // 10 per day
        
        if(fine > 0){
            await prisma.bookIssue.update({
                where: {
                    id: issuedBook.id,
                },
                data: {
                    fine,
                }
            });
    
            await prisma.user.update({
                where : {
                    id : userId
                },
                data : {
                    fine : user.fine + fine,
                }
            })
        }

        // Update the book's available copies
        const updatedBook = await prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                availableCopies : book.availableCopies + 1,
            },
        });
        return NextResponse.json({ message: "Book returned successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error returning book:", error);
        return NextResponse.json({ message: "Internal server error, try again after some time!", error }, { status: 500 });
        
    }
}

export async function GET(req : NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const returnedBooks = await prisma.bookIssue.findMany({
            where: {
                status : "RETURNED"
            },
            include: {
                book: true,
                user: true,
            }
        });
        return NextResponse.json({ message: "Returned books retrieved successfully", returnedBooks, success : true }, { status: 200 });

    } catch (error) {
        console.error("Error getting returned books:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
        
    }
}