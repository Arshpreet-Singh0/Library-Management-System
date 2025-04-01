import { APP_URL } from "@/config/config";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface Activity {
  activity: "Issued" | "Returned";
  book: string;
  user: string;
  date: string;
  status: string;
}

const getActivities = async () => {
  try {
    const res = await axios.get(`${APP_URL}/api/v1/admin/recent`);

    return res?.data?.activities;
  } catch (error) {
    return [];
  }
};
const RecentActivities = async () => {
  const recentActivities = await getActivities();

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest transactions in the library</CardDescription>
        </div>
        <Link href="/admin/activities">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity: Activity) => (
              <TableRow key={activity.date}>
                <TableCell>
                  {activity.activity === "Issued" ? (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Issued
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Returned
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">{activity.book}</TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  {activity.activity === "Issued" ? (
                    <span className="text-sm">
                      Due: {activity.status.replace("Due: ", "")}
                    </span>
                  ) : activity.status.toLowerCase() === "on time" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      On time
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      {activity.status.startsWith("Overdue")
                        ? activity.status
                        : `Overdue (${activity.status})`}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
