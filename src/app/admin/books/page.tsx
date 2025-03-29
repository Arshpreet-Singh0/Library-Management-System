import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit, Plus, Search, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Book } from "@prisma/client"
import axios from "axios";
import { APP_URL } from "@/config/config"
import { Input } from "@/components/ui/input"

const getBooks = async () => {
  try {
    const res = await axios.get(`${APP_URL}/api/v1/book`);
    return res.data.books;
  } catch (error) {
    console.log(error);
    
    return [];
  }
}

export default async function BooksPage() {
  // Mock data for books
  const books: Book[] = await getBooks();

  return (
    <div className="space-y-6 w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Books</h1>
          <p className="text-muted-foreground">Add, edit, or remove books from the library</p>
        </div>
        <Link href="/admin/books/add">
          <Button className="bg-black text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search books..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="science-fiction">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-center">Copies</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead className="text-center">Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.authors?.[0]}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-center">{book.totalCopies}</TableCell>
                <TableCell className="text-center">
                  {book.availableCopies > 0 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {book.availableCopies}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      0
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">{book.location || "Library"}</TableCell>
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

