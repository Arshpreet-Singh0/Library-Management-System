import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        const recentActivities = await prisma.bookIssue.findMany({
            orderBy: {
              updatedAt  : 'desc'
            },
            take: 5, // Get the 5 most recent activities
            include: {
              book: {
                select: { title: true },
              },
              user: {
                select: { name: true },
              },
            },
          });
          
          const activities = recentActivities.map((activity) => ({
            
            activity: activity.returnDate ? "Returned" : "Issued",
            book: activity.book.title,
            user: activity.user.name,
            date: activity.createdAt.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
            status: activity.returnDate
              ? new Date(activity.returnDate) <= new Date(activity.dueDate)
                ? "On time"
                : `Overdue ($${activity.fine || "0.00"})`
              : `Due: ${activity.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
          }));

          console.log(activities);

          return NextResponse.json({activities, success : true}, {status : 200});
    } catch (error) {
        return NextResponse.json({message : "Error while fetching recent activities", error}, {status : 500})
    }
}