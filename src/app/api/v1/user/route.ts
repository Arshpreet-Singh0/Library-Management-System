import prisma from "@/db";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if(!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword : bcrypt.hashSync(password, 10), // Hash the password before storing it
                emailVerified: new Date(),
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
                role: "STUDENT", // Default role
            }
        });
        return NextResponse.json({ message: "Signup successfull." }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
        
    }
}

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