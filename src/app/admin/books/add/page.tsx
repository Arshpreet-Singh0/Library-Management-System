"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AddBookPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({
    title : "",
    authors : [""],
    description : "",
    publishedYear : "",
    isbn : "",
    publisher : "",
    totalCopies : "",
    genre : "",
    coverImage : "",
    shelfLocation : ""
  });
  const [authors, setAuthors] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);

    book.authors = authors.split(",").map((a)=>a.trim());

    try {
      const res = await axios.post('/api/v1/book', book);

      if(res?.data?.success){
        toast({
          title: "Success",
          description: res?.data?.mesage,
        });
        router.push('/books');
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast({
          title: "Error",
          description: error.response?.data?.message,
        });
      }
      else{
        toast({
          title: "Error",
          description: "Internal Server error!",
        });
      }
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
            <CardDescription>Enter the details of the new book to add to the library.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input id="title" placeholder="Enter book title" name="title" onChange={(e) => setBook((b) => ({ ...b, title : e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN Number</Label>
                <Input id="isbn" placeholder="e.g. 9780123456789" value={book.isbn} onChange={(e) => setBook((b) => ({ ...b, isbn : e.target.value }))} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="author">Author (comma seperated)</Label>
                <Input id="author" placeholder="Author name" value={authors} onChange={(e)=>setAuthors(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input id="publisher" placeholder="Publisher name" value={book.publisher} onChange={(e) => setBook((b) => ({ ...b, publisher: e.target.value }))} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={book.genre} onValueChange={(value) => setBook({ ...book, genre: value})}>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="science-fiction">Science Fiction</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="biography">Biography</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publication-year">Publication Year</Label>
                <Input id="publication-year" type="number" placeholder="e.g. 2023" value={book.publishedYear} onChange={(e) => setBook((b) => ({ ...b, publishedYear : e.target.value }))} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies</Label>
                <Input id="copies" type="number" min="1" value={book.totalCopies} onChange={(e) => setBook((b) => ({ ...b, totalCopies: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Shelf Location</Label>
                <Input id="location" placeholder="e.g. A-12" value={book.shelfLocation} onChange={(e) => setBook((b) => ({ ...b, shelfLocation: e.target.value }))} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover-image">Cover Image URL (Optional)</Label>
              <Input id="cover-image" placeholder="https://example.com/book-cover.jpg" value={book.coverImage} onChange={(e) => setBook((b) => ({ ...b, coverImage: e.target.value }))}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Book Description</Label>
              <Textarea id="description" placeholder="Enter a brief description of the book" value={book.description} onChange={(e) => setBook((b) => ({ ...b, description: e.target.value }))} rows={4} required/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-black text-white">
              {isSubmitting ? "Adding Book..." : "Add Book"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

