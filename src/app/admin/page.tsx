import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  BookCheck,
  Search,
  AlertTriangle,
  BarChart3,
  BookX,
  ArrowUpRight,
  RefreshCw,
  BookMarked,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { APP_URL } from "@/config/config"
import { Book } from "@prisma/client"
import { Fallback } from "@radix-ui/react-avatar"
import { Suspense } from "react"
import RecentActivities from "@/components/admin/RecentActivities"
import OverdueBooks from "@/components/admin/OverdueBooks"

const getData = async()=>{
  console.log("API URL:", `${APP_URL}/api/v1/admin`);

  
    try {
        const res = await axios.get(`${APP_URL}/api/v1/admin`);
        console.log(res.data);
        
        return res.data;
    } catch (error) {
      
        return null;
    }
}

export default async function AdminDashboard() {
  // Mock data for dashboard statistics

  const {users, books, overdueBooks, newBooks} = await getData();
  const stats = {
    totalBooks: 10245,
    availableBooks: 8732,
    issuedBooks: 1513,
    overdueBooks: 124,
    totalUsers: 2573,
    activeUsers: 1845,
    totalFines: 1250.75,
    newBooksThisMonth: 87,
  }
  // Mock data for recent activities
  const recentActivities = [
    {
      id: "1",
      type: "issue",
      book: "The Great Gatsby",
      user: "John Doe",
      date: "Mar 30, 2025",
      dueDate: "Apr 6, 2025",
    },
    {
      id: "2",
      type: "return",
      book: "To Kill a Mockingbird",
      user: "Jane Smith",
      date: "Mar 30, 2025",
      status: "on-time",
    },
    {
      id: "3",
      type: "issue",
      book: "1984",
      user: "Robert Johnson",
      date: "Mar 29, 2025",
      dueDate: "Apr 5, 2025",
    },
    {
      id: "4",
      type: "return",
      book: "Pride and Prejudice",
      user: "Emily Davis",
      date: "Mar 29, 2025",
      status: "overdue",
      fine: 2.5,
    },
    {
      id: "5",
      type: "issue",
      book: "The Hobbit",
      user: "Michael Wilson",
      date: "Mar 28, 2025",
      dueDate: "Apr 4, 2025",
    },
  ]

  const overdueBookss = [
    {
      id: "1",
      title: "1984",
      author: "George Orwell",
      borrower: "Alice Johnson",
      dueDate: "Mar 25, 2025",
      daysOverdue: 5,
    },
    {
      id: "2",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      borrower: "Bob Smith",
      dueDate: "Mar 23, 2025",
      daysOverdue: 7,
    },
    {
      id: "3",
      title: "Brave New World",
      author: "Aldous Huxley",
      borrower: "Carol Davis",
      dueDate: "Mar 20, 2025",
      daysOverdue: 10,
    },
  ]


  return (
    <div className="space-y-8 w-[85%] mx-auto p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your library system</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/books/issue">
            <Button className="gap-2">
              <BookCheck className="h-4 w-4" />
              Issue Book
            </Button>
          </Link>
          <Link href="/admin/books/return">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Return Book
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/books/issue">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <BookCheck className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Issue Book</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/books/return">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <RefreshCw className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Return Book</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/books/add">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Add Book</h3>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/users/add">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Add User</h3>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.toLocaleString()}</div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-muted-foreground">Available: {stats.availableBooks.toLocaleString()}</span>
              <span className="text-muted-foreground">Issued: {stats.issuedBooks.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.toLocaleString()}</div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-muted-foreground">Active: {stats.activeUsers.toLocaleString()}</span>
              <span className="text-muted-foreground">Inactive: {stats.totalUsers - stats.activeUsers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueBooks.toLocaleString()}</div>
            <div className="mt-2 text-xs">
              <span className="text-muted-foreground">Total fines: ₹{stats.totalFines.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Books</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newBooks}</div>
            <div className="mt-2 text-xs">
              <span className="text-muted-foreground">Added this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Suspense fallback={<div>Loading...</div>}>
        <RecentActivities />
        </Suspense>

        {/* Overdue Books */}
        <Suspense fallback={<div>Loading...</div>}>
        <OverdueBooks />
        </Suspense>
      </div>

      {/* Book Management Tabs */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Book Management</CardTitle>
          <CardDescription>Issue, return, and manage book circulation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="issue">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="issue">Issue Book</TabsTrigger>
              <TabsTrigger value="return">Return Book</TabsTrigger>
            </TabsList> */}

            {/* Issue Book Tab */}
            {/* <TabsContent value="issue" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="book-search">Book ISBN or Title</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="book-search" placeholder="Enter ISBN or book title" className="pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-search">User ID or Name</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="user-search" placeholder="Enter user ID or name" className="pl-8" />
                  </div>
                </div>
              </div> */}

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input id="issue-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
              </div>

              <Button className="w-full">
                <BookCheck className="mr-2 h-4 w-4" />
                Issue Book
              </Button>
            </TabsContent> */}

            {/* Return Book Tab */}
            {/* <TabsContent value="return" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="issue-id">Issue ID or Book ISBN</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="issue-id" placeholder="Enter issue ID or book ISBN" className="pl-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="return-date">Return Date</Label>
                  <Input id="return-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div> */}

                {/* <div className="space-y-2">
                  <Label htmlFor="book-condition">Book Condition</Label>
                  <Select defaultValue="good">
                    <SelectTrigger id="book-condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              {/* </div>

              <div className="space-y-2">
                <Label htmlFor="return-notes">Notes</Label>
                <Input id="return-notes" placeholder="Any notes about the return (optional)" />
              </div>

              <Button className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Return Book
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book Circulation</CardTitle>
            <CardDescription>Monthly book circulation statistics</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Circulation statistics chart would appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
            <CardDescription>Most borrowed books this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-14 bg-muted flex items-center justify-center rounded">
                    <span className="font-bold text-muted-foreground">{i}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Popular Book Title {i}</h4>
                    <p className="text-sm text-muted-foreground">Borrowed {20 - i * 2} times</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

