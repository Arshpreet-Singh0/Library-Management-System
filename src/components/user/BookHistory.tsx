import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/db";

const fetchHistory = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return [];
  }

  const history = await prisma.bookIssue.findMany({
    where: { userId: session.user.id },
    include: { book: { select: { title: true, authors: true } } },
  });

  return history;
};

const BookHistory = async () => {
  const borrowingHistory = await fetchHistory();

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowingHistory.length > 0 ? (
              borrowingHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.book.title}</TableCell>
                  <TableCell>{entry.book.authors?.[0]}</TableCell>
                  <TableCell>{new Date(entry.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.returnDate ? new Date(entry.returnDate).toLocaleDateString() : "Not returned"}</TableCell>
                  <TableCell>
                    {entry.returnDate ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Returned</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Not Returned</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No book history found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookHistory;
