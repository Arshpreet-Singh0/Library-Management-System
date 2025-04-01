import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FinesPage() {
  // Mock data for fines
  const fines = [
    {
      id: "1",
      bookTitle: "1984",
      dueDate: "Mar 22, 2025",
      returnDate: "Mar 29, 2025",
      daysLate: 7,
      amount: 3.5,
      status: "unpaid",
    },
    {
      id: "2",
      bookTitle: "The Catcher in the Rye",
      dueDate: "Feb 15, 2025",
      returnDate: "Feb 25, 2025",
      daysLate: 10,
      amount: 5.0,
      status: "paid",
    },
    {
      id: "3",
      bookTitle: "Brave New World",
      dueDate: "Jan 10, 2025",
      returnDate: "Jan 18, 2025",
      daysLate: 8,
      amount: 4.0,
      status: "paid",
    },
  ]

  // Calculate total unpaid fines
  const totalUnpaidFines : number = fines
    .filter((fine) => fine.status === "unpaid")
    .reduce((total, fine) => total + fine.amount, 0)

  return (
    <div className="space-y-6 w-[85%] mx-auto p-10">
      <div>
        <h1 className="text-3xl font-bold">My Fines</h1>
        <p className="text-muted-foreground">View and manage your library fines</p>
      </div>

      {totalUnpaidFines > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Outstanding Fines</AlertTitle>
          <AlertDescription>
            You have ${totalUnpaidFines} in unpaid fines. Please settle your fines to continue borrowing books.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Fine History</CardTitle>
          <CardDescription>A record of all fines associated with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Days Late</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fines.map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell className="font-medium">{fine.bookTitle}</TableCell>
                  <TableCell>{fine.dueDate}</TableCell>
                  <TableCell>{fine.returnDate}</TableCell>
                  <TableCell>{fine.daysLate} days</TableCell>
                  <TableCell>${fine.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {fine.status === "paid" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Unpaid
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {fine.status === "unpaid" && (
                      <Button size="sm" variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fine Policy</CardTitle>
          <CardDescription>Information about the library's fine policy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Late Return Fines</h3>
            <p className="text-sm text-muted-foreground">
              Books returned after the due date are subject to a fine of $0.50 per day, up to a maximum of $20.00 per
              item.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Damaged or Lost Books</h3>
            <p className="text-sm text-muted-foreground">
              If a book is damaged or lost, you will be charged the replacement cost of the book plus a $5.00 processing
              fee.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              Fines can be paid online through the library portal or in person at the library circulation desk.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Borrowing Restrictions</h3>
            <p className="text-sm text-muted-foreground">
              Users with unpaid fines exceeding $10.00 will not be able to borrow additional items until the fines are
              paid.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

