import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { title, authors, genre, publishedYear, isbn, description, publisher, totalCopies } = body;

        // Validate all required fields
        if (!title || !authors || !genre || !publishedYear || !isbn || !description || !publisher || !totalCopies) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Ensure authors is stored as an array if it's a string
        const authorsArray = Array.isArray(authors) ? authors : [authors];

        const book = await prisma.book.create({
            data: {
                title,
                authors: authorsArray,
                publishedYear,
                isbn,
                genre,
                description,
                publisher,
                totalCopies,
                availableCopies: totalCopies,
                coverImage: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
            }
        });

        return NextResponse.json({ message: "Book created successfully", book }, { status: 201 });
    } catch (error) {
        console.error("Error creating book:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

export async function GET(req: NextRequest){
    try {
        const books = await prisma.book.findMany({});
        return NextResponse.json({ message: "Books retrieved successfully", books, success : true }, { status: 200 });
    } catch (error) {
        console.error("Error getting books:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}