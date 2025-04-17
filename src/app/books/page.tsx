'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_URL } from "@/config/config";
import axios from "axios";
import { BookOpen, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@prisma/client";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${APP_URL}/api/v1/book`);
        setBooks(res?.data?.books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedGenre === "all" || book.genre === selectedGenre)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-[90%] mx-auto p-10">
        <div>
          <h1 className="text-3xl font-bold">Library Books</h1>
          <p className="text-muted-foreground">Browse our collection of books</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="science-fiction">Science Fiction</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] mx-auto p-10">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden flex flex-col animate-pulse">
              <div className="aspect-[3/3] bg-gray-300" />
              <CardHeader className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))
        ) : (
          filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col">
                <div className="aspect-[3/3] relative">
                  <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.authors?.[0]}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <div className="flex items-center justify-between text-sm">
                    <span>ISBN: {book.isbn}</span>
                    <span>{book.genre}</span>
                  </div>
                  <div className="mt-2">
                    {book.availableCopies > 0 ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-700 bg-green-50 border-green-200">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-red-700 bg-red-50 border-red-200">
                        Checked Out
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/books/${book.isbn}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="p-4 pt-0 text-center text-lg text-muted-foreground">
              No books found.
              </div>
          )
        )}
      </div>
    </div>
  );
}