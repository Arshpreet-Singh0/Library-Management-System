import prisma from "@/db";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Calendar,
  Download,
  BookOpen,
  RefreshCw,
  UserPlus,
  BookPlus,
  DollarSign,
  Bell,
  Mail,
  Info,
  Eye,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const getActivities = async () => {
    try {
        const recentActivities = await prisma.bookIssue.findMany({
            orderBy: {
              updatedAt  : 'desc'
            },
            select : {
                book: true,
              user: {
                select: { name: true , email : true, image : true, id : true},
              },
              fine : true,
              returnDate : true,
              createdAt : true,
              dueDate : true,
              id : true
            }
          });
          
          const activities = recentActivities.map((activity) => ({
            id : activity.id,
            activity: activity.returnDate ? "Returned" : "Issued",
            book: activity.book,
            user: activity.user,
            dueDate : activity.dueDate,
            date: activity.createdAt.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
            fine : activity.fine || 0,
            type : activity.returnDate ? "return" : "issue",
            status : activity.returnDate
              ? new Date(activity.returnDate) <= new Date(activity.dueDate)
                ? "On time"
                : `Overdue ($${activity.fine || "0.00"})`
              : `Due: ${activity.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
          }))
          ;

          return activities;
    } catch (error) {
      return [];
    }
  };

  export default async function ActivitiesPage() {
    // Mock data for activities
    const activities = await getActivities();
  
    // Function to get activity icon based on type
    const getActivityIcon = (type: string) => {
      switch (type) {
        case "issue":
          return <BookOpen className="h-4 w-4" />
        case "return":
          return <RefreshCw className="h-4 w-4" />
        case "add-user":
          return <UserPlus className="h-4 w-4" />
        case "add-book":
          return <BookPlus className="h-4 w-4" />
        case "fine-payment":
          return <DollarSign className="h-4 w-4" />
        case "reminder":
          return <Bell className="h-4 w-4" />
        default:
          return <Info className="h-4 w-4" />
      }
    }
  
    // Function to get activity badge based on type
    const getActivityBadge = (activity: any) => {
      switch (activity.type) {
        case "issue":
          return (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Issued
            </Badge>
          )
        case "return":
          if (activity.status === "overdue") {
            return (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Returned Late
              </Badge>
            )
          }
          return (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Returned
            </Badge>
          )
        case "add-user":
          return (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              New User
            </Badge>
          )
        case "add-book":
          return (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              New Book
            </Badge>
          )
        case "fine-payment":
          return (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Payment
            </Badge>
          )
        case "reminder":
          return (
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              Reminder
            </Badge>
          )
        default:
          return <Badge variant="outline">Activity</Badge>
      }
    }
  
    // Function to get activity details based on type
    const getActivityDetails = (activity: any) => {
      switch (activity.type) {
        case "issue":
          return (
            <>
              <span className="font-medium">{activity.book.title}</span> issued to{" "}
              <span className="font-medium">{activity.user.name}</span>
            </>
          )
        case "return":
          return (
            <>
              <span className="font-medium">{activity.book.title}</span> returned by{" "}
              <span className="font-medium">{activity.user.name}</span>
              {activity.status === "overdue" && ` with $${activity.fine.toFixed(2)} fine`}
            </>
          )
        case "add-user":
          return (
            <>
              New user <span className="font-medium">{activity.user.name}</span> added to system
            </>
          )
        case "add-book":
          return (
            <>
              <span className="font-medium">{activity.book.title}</span> added to library ({activity.copies} copies)
            </>
          )
        case "fine-payment":
          return (
            <>
              <span className="font-medium">${activity.amount.toFixed(2)}</span> fine paid by{" "}
              <span className="font-medium">{activity.user.name}</span> via {activity.paymentMethod}
            </>
          )
        case "reminder":
          return (
            <>
              Reminder sent to <span className="font-medium">{activity.user.name}</span> for{" "}
              <span className="font-medium">{activity.book.title}</span>
            </>
          )
        default:
          return "Unknown activity"
      }
    }
  
    return (
      <div className="space-y-6 w-[85%] mx-auto p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Activity Log</h1>
            <p className="text-muted-foreground">Comprehensive record of all library activities</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
  
        {/* Activity Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Books Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.filter((a) => a.type === "issue").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Books Returned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.filter((a) => a.type === "return").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Fines Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {activities
                  .filter((a) => a.type === "fine-payment")
                  .reduce((sum, a) => sum + a.fine, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </div>
  
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search activities..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Activity type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="issue">Book Issues</SelectItem>
                <SelectItem value="return">Book Returns</SelectItem>
                <SelectItem value="add-book">Book Additions</SelectItem>
                <SelectItem value="add-user">User Registrations</SelectItem>
                <SelectItem value="fine-payment">Fine Payments</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
              </SelectContent>
            </Select>
  
            <Select defaultValue="all-users">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Staff member" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all-users">All Staff</SelectItem>
                <SelectItem value="smith">Librarian Smith</SelectItem>
                <SelectItem value="johnson">Librarian Johnson</SelectItem>
                <SelectItem value="davis">Librarian Davis</SelectItem>
                <SelectItem value="wilson">Librarian Wilson</SelectItem>
                <SelectItem value="brown">Librarian Brown</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
  
        {/* Activities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Showing all activities from March 27, 2025 to March 30, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date & Time</TableHead>
                  {/* <TableHead>Performed By</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">{getActivityBadge(activity)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {(activity.type === "issue" ||
                          activity.type === "return" ||
                          activity.type === "add-book" ||
                          activity.type === "reminder") && (
                          <div className="w-8 h-12 bg-muted relative rounded overflow-hidden">
                            <Image
                              src={activity.book.coverImage || "/placeholder.svg"}
                              alt={activity.book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        {(activity.type === "add-user" || activity.type === "fine-payment") && (
                          <div className="w-8 h-8 bg-muted relative rounded-full overflow-hidden">
                            <Image
                              src={activity.user?.image || "/placeholder.svg"}
                              alt={activity.user.name || "User"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          {getActivityDetails(activity)}
                          {activity.type === "issue" && (
                            <div className="text-xs text-muted-foreground mt-1">Due: {activity.dueDate.toLocaleString()}</div>
                          )}
                          {/* {activity.type === "return" && activity.condition && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Condition: <span className="capitalize">{activity.condition}</span>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>{activity.date}</span>
                      </div>
                    </TableCell>
                    {/* <TableCell>{activity.performedBy}</TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View Details</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[525px]">
                                  <DialogHeader>
                                    <DialogTitle>Activity Details</DialogTitle>
                                    <DialogDescription>Complete information about this activity</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="flex items-center gap-2 pb-2 border-b">
                                      {getActivityIcon(activity.type)}
                                      <h3 className="font-semibold">{getActivityBadge(activity)}</h3>
                                      <span className="ml-auto text-sm text-muted-foreground">{activity.date}</span>
                                    </div>
  
                                    {(activity.type === "issue" ||
                                      activity.type === "return" ||
                                      activity.type === "add-book" ||
                                      activity.type === "reminder") && (
                                      <div className="flex gap-4">
                                        <div className="w-16 h-24 bg-muted relative rounded overflow-hidden">
                                          <Image
                                            src={activity.book.coverImage || "/placeholder.svg"}
                                            alt={activity.book.title}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div>
                                          <h4 className="font-semibold">{activity.book.title}</h4>
                                          <p className="text-sm text-muted-foreground">{activity.book.authors?.[0]}</p>
                                          <p className="text-xs text-muted-foreground">ISBN: {activity.book.isbn}</p>
  
                                          {activity.type === "issue" && (
                                            <div className="mt-2 text-sm">
                                              <div>Issue Date: {activity.date.split(" ")[0]}</div>
                                              <div>Due Date: {activity.dueDate.toDateString()}</div>
                                            </div>
                                          )}
  
                                          {activity.type === "return" && (
                                            <div className="mt-2 text-sm">
                                              <div>Return Date: {activity.date.split(" ")[0]}</div>
                                              <div>
                                                Condition: <span className="capitalize">{"Good"}</span>
                                              </div>
                                              {activity.status === "overdue" && (
                                                <div>Fine: ${activity.fine.toFixed(2)}</div>
                                              )}
                                            </div>
                                          )}
  
                                          {/* {activity.type === "add-book" && (
                                            // <div className="mt-2 text-sm">
                                            //   <div>Copies Added: {activity.copies}</div>
                                            // </div>
                                          )} */}
                                        </div>
                                      </div>
                                    )}
  
                                    {(activity.type === "issue" ||
                                      activity.type === "return" ||
                                      activity.type === "add-user" ||
                                      activity.type === "fine-payment" ||
                                      activity.type === "reminder") && (
                                      <div className="flex gap-4 mt-4">
                                        <div className="w-12 h-12 bg-muted relative rounded-full overflow-hidden">
                                          <Image
                                            src={activity.user.image || "/placeholder.svg"}
                                            alt={activity.user.name || ""}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div>
                                          <h4 className="font-semibold">{activity.user.name}</h4>
                                          <p className="text-sm text-muted-foreground">ID: {activity.user.id}</p>
  
                                          {activity.type === "fine-payment" && (
                                            <div className="mt-2 text-sm">
                                              <div>Amount: ${activity.fine.toFixed(2)}</div>
                                              {/* <div>
                                                Payment Method:{" "}
                                                <span className="capitalize">{activity.paymentMethod}</span>
                                              </div> */}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
  
                                    {/* <div className="mt-4">
                                      <h4 className="text-sm font-semibold mb-1">Additional Information</h4>
                                      <div className="text-sm">
                                        <div>Performed by: {activity.performedBy}</div>
                                        {activity.notes && (
                                          <div className="mt-2">
                                            <div className="font-semibold text-sm">Notes:</div>
                                            <p className="text-sm text-muted-foreground">{activity.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div> */}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
  
                        {activity.type === "issue" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link href={`/admin/return-books?id=${activity.book.id}`}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="sr-only">Process Return</span>
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Process Return</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
  
                        {activity.type === "issue" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Mail className="h-4 w-4" />
                                  <span className="sr-only">Send Reminder</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send Reminder</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
  
            {/* Pagination */}
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  