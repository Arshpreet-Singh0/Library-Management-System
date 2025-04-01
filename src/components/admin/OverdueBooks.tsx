import { APP_URL } from "@/config/config";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BookX } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";

const getoverdueBooks = async()=>{
    try {
        const res = await axios.get(`${APP_URL}/api/v1/book/return`);
        return res.data?.overdueBooks;
    } catch (error) {
        return [];
    }
}

interface Book {
    title : string;
    authors : string[],
    user : {
        name : string
    },
    dueDate : Date,
    id : string
}

const OverdueBooks = async() => {
    const overdueBooks = await getoverdueBooks();
  return (
    <Card>
          <CardHeader>
            <CardTitle>Overdue Books</CardTitle>
            <CardDescription>Books that need to be returned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overdueBooks.map((book : Book) => (
              <div key={book.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-10 h-14 bg-muted flex items-center justify-center rounded">
                  <BookX className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium line-clamp-1">{book.title}</h4>
                  <p className="text-sm text-muted-foreground">{book.authors?.[0]}</p>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>{book.user?.name}</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {daysOverdue(book)} days overdue
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/admin/books/overdue" className="block">
              <Button variant="outline" size="sm" className="w-full">
                View All Overdue Books
              </Button>
            </Link>
          </CardContent>
        </Card>
  )
}

export default OverdueBooks

const daysOverdue = (book : Book)=>{
    return Math.max(
        Math.floor((new Date().getTime() - new Date(book.dueDate).getTime()) / (1000 * 60 * 60 * 24)),
        0
      )
}