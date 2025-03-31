import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function OverdueBooksPage() {
  // Mock data for overdue books
  const overdueBooks = [
    {
      id: "1",
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      borrower: "Alice Johnson",
      borrowerId: "ST12345",
      email: "alice.j@university.edu",
      issueDate: "Mar 15, 2025",
      dueDate: "Mar 22, 2025",
      daysOverdue: 8,
      fine: 4.0,
    },
    {
      id: "2",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "9780316769488",
      borrower: "Bob Smith",
      borrowerId: "ST67890",
      email: "bob.s@university.edu",
      issueDate: "Mar 10, 2025",
      dueDate: "Mar 17, 2025",
      daysOverdue: 13,
      fine: 6.5,
    },
    {
      id: "3",
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "9780060850524",
      borrower: "Carol Davis",
      borrowerId: "ST24680",
      email: "carol.d@university.edu",
      issueDate: "Mar 12, 2025",
      dueDate: "Mar 19, 2025",
      daysOverdue: 11,
      fine: 5.5,
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      borrower: "David Wilson",
      borrowerId: "ST13579",
      email: "david.w@university.edu",
      issueDate: "Mar 18, 2025",
      dueDate: "Mar 25, 2025",
      daysOverdue: 5,
      fine: 2.5,
    },
    {
      id: "5",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      borrower: "Emma Brown",
      borrowerId: "ST97531",
      email: "emma.b@university.edu",
      issueDate: "Mar 20, 2025",
      dueDate: "Mar 27, 2025",
      daysOverdue: 3,
      fine: 1.5,
    },
  ]

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
            {overdueBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-sm text-muted-foreground">{book.author}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{book.borrower}</div>
                    <div className="text-sm text-muted-foreground">{book.borrowerId}</div>
                  </div>
                </TableCell>
                <TableCell>{book.dueDate}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive" className="bg-red-500/70">{book.daysOverdue} days</Badge>
                </TableCell>
                <TableCell className="text-center ">₹{book.fine.toFixed(2)}</TableCell>
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

