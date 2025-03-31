import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        const users = await prisma.user.count();
        const books = await prisma.book.count();

        const overdueBooks = await prisma.bookIssue.count({
            where: {
              dueDate: {
                lt: new Date()
              }
            }
          });

          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const newBooks = await prisma.book.count({
            where: {
              createdAt: {
                gt: thirtyDaysAgo,
              }
            }
          });

          return NextResponse.json({users, books, overdueBooks, newBooks});
          
    } catch (error) {
        return NextResponse.json({message : "error fetching details", success : false});

    }
}