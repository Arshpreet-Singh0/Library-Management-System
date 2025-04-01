import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, RefreshCw } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { APP_URL } from "@/config/config"
import { Book } from "@prisma/client"

const getoverdueBooks = async()=>{
  try {
      const res = await axios.get(`${APP_URL}/api/v1/book/overdue`);
      
      return res.data?.overdueBooks;
  } catch (error) {
      return [];
  }
}

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
  user : {
    name : string;
  }
}


export default async function OverdueBooksPage() {
  // Mock data for overdue books
  const overdueBooks = await getoverdueBooks();

  return (
    <div className="space-y-6 w-[80%] mx-auto p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Overdue Books</h1>
          <p className="text-muted-foreground">Books that are past their due date</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            Send Reminders
          </Button>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Process Returns
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by book title, borrower, or ID..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by days overdue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Overdue</SelectItem>
            <SelectItem value="1-7">1-7 days</SelectItem>
            <SelectItem value="8-14">8-14 days</SelectItem>
            <SelectItem value="15+">15+ days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>Borrower</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-center">Days Overdue</TableHead>
              <TableHead className="text-center">Fine</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overdueBooks.map((book : BookIssue) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{book?.book?.title}</div>
                    <div className="text-sm text-muted-foreground">{book?.book?.authors?.[0]}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{book?.user?.name}</div>
                    {/* <div className="text-sm text-muted-foreground">{book?.user?.name}</div> */}
                  </div>
                </TableCell>
                <TableCell>{new Date(book.dueDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive" className="bg-red-500/70">{daysOverdue(book)} days</Badge>
                </TableCell>
                <TableCell className="text-center ">₹{book.fine}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Send reminder</span>
                    </Button>
                    <Link href={`/admin/books/return?id=${book.id}`}>
                      <Button variant="outline" size="sm" className="h-8">
                        Process Return
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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