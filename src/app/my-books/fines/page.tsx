import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/db";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Fine {
  id: string;
  bookId: string;
  userId: string;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date;
  status: "RETURNED" | "ACTIVE";
  fine: number;
  condition: "good" | "damaged" | "lost";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  book: {
    id: string;
    title: string;
  };
}

const getFines = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const fines = await prisma.bookIssue.findMany({
      where: {
        userId: session.user.id,
        fine: { gt: 0 },
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return fines;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function FinesPage() {
  const fines = await getFines(); // Fetch dynamic fines data from the server

  if (fines == null) redirect("/");

  // Calculate total fines (this includes both paid and unpaid)
  const totalFines: number = fines.reduce((total, fine) => {
    return total + (fine?.fine || 0);
  }, 0);

  console.log(fines);

  return (
    <div className="space-y-6 w-[85%] mx-auto p-10">
      <div>
        <h1 className="text-3xl font-bold">My Fines</h1>
        <p className="text-muted-foreground">
          View and manage your library fines
        </p>
      </div>

      {totalFines > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Outstanding Fines</AlertTitle>
          <AlertDescription>
            You have ₹{totalFines.toFixed(2)} in fines. Please settle your fines
            to continue borrowing books.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Fine History</CardTitle>
          <CardDescription>
            A record of all fines associated with your account
          </CardDescription>
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
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fines.map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell className="font-medium">
                    {fine.book.title}
                  </TableCell>
                  <TableCell>
                    {new Date(fine.dueDate).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>
                    {calculateDaysLate(fine.dueDate, fine.returnDate)} days
                  </TableCell>
                  <TableCell>
                    <Badge variant={"destructive"} className="bg-red-400">{fine.fine != null ? `₹${fine.fine.toFixed(2)}` : "₹0.00"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now
                    </Button>
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
          <CardDescription>
            Information about the library's fine policy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Late Return Fines</h3>
            <p className="text-sm text-muted-foreground">
              Books returned after the due date are subject to a fine of $0.50
              per day, up to a maximum of ₹10.00 per item.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Damaged or Lost Books</h3>
            <p className="text-sm text-muted-foreground">
              If a book is damaged or lost, you will be charged the replacement
              cost of the book plus a ₹5.00 processing fee.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              Fines can be paid online through the library portal or in person
              at the library circulation desk.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Borrowing Restrictions</h3>
            <p className="text-sm text-muted-foreground">
              Users with unpaid fines exceeding ₹10.00 will not be able to
              borrow additional items until the fines are paid.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const calculateDaysLate = (dueDate: Date, returnDate: Date | null): number => {
  if (!returnDate) return 0;

  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  const diffTime = returned.getTime() - due.getTime();
  const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

  return diffDays;
};
