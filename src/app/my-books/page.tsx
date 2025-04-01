import { Suspense } from "react"
import { BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import prisma from "@/db"
import BookHistory from "@/components/user/BookHistory"
import { Book } from "@prisma/client"

interface BookIssue{
  book : Book,
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fine: number | null;
  userId: string;
  bookId: string;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status : string;
}

async function fetchBorrowedBooks() {
  try {
    const session = await getServerSession(authOptions);
    if(!session) return null;

    const borrowedBooks = await prisma.bookIssue.findMany({
      where : {
        userId : session?.user?.id,
        returnDate : null,
      },
      include : {
        book : true
      }
    });
    return borrowedBooks;
  } catch (error) {
    return [];
  }
}

export default async function MyBooksPage() {
  const borrowedBooks = await fetchBorrowedBooks()


  if(borrowedBooks==null) redirect('/');

  return (
    <div className="space-y-8 w-[85%] mx-auto p-10">
      <h1 className="text-3xl font-bold">My Books</h1>
      <p className="text-muted-foreground">Manage your borrowed books and view your borrowing history</p>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Currently Borrowed Books</h2>

        {borrowedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {borrowedBooks.map((book: BookIssue) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 p-4">
                    <div className="aspect-[2/3] relative">
                      <Image src={book?.book.coverImage || "/placeholder.svg"} alt={book?.book?.title} fill className="object-cover rounded-md" />
                    </div>
                  </div>
                  <div className="w-2/3 flex flex-col">
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="line-clamp-1">{book?.book?.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{book.book.authors?.[0]}</p>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex-grow">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Issue Date:</span>
                          <span>{new Date(book.issueDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{new Date(book.dueDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Status:</span>
                          {book.status === "ACTIVE" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{getDaysLeft(book.dueDate)} days left</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{daysOverdue(book)} days overdue</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/books/${book.book?.isbn}`} className="w-full">
                        <Button variant="outline" className="w-full"><BookOpen className="mr-2 h-4 w-4" />View Details</Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Books Borrowed</h3>
              <p className="text-muted-foreground mb-4">You haven't borrowed any books yet.</p>
              <Link href="/books">
                <Button>Browse Books</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Borrowing History</h2>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading history...</div>}>
          <BookHistory />
        </Suspense>
      </div>
    </div>
  )
}
const daysOverdue = (book : BookIssue)=>{
  return Math.max(
      Math.floor((new Date().getTime() - new Date(book.dueDate).getTime()) / (1000 * 60 * 60 * 24)),
      0
    )
}
function getDaysLeft(dueDate: Date): number {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return daysLeft
}