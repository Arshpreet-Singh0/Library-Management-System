import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link";
import prisma from "@/db"

const getUsers = async()=>{
    try {
        const users = await prisma.user.findMany({
            select : {
                name : true,
                email : true,
                id : true,
                image : true,
                BookIssue : true,
            }
        })

        return users;
    } catch (error) {
        return [];
    }
}


export default async function ManageUsersPage() {
  // Mock data for users
  const users = await getUsers();

  return (
    <div className="space-y-6 w-[85%] mx-auto p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">Add, edit, or remove users from the system</p>
        </div>
        <Link href="/signup">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="computer-science">Computer Science</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Books Borrowed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">{user?.BookIssue?.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
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

