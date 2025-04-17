import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        const overdueBooks = await prisma.bookIssue.findMany({
            where : {
                dueDate: { lt: new Date() },
                returnDate : null,
            },
            include : {
                user : {
                    select : {name : true}
                },
                book : true
            }
        });

        console.log(overdueBooks);
        

        return NextResponse.json({overdueBooks, success : true});
    } catch (error) {
        return NextResponse.json({message : "error while fetching data"}, {status : 500});
    }
}