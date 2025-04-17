"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import Image from "next/image"
import { BookIssue } from "@/types/type"
import { useRouter } from "next/navigation"

export default function ReturnBookPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email , setEmail] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bookFound, setBookFound] = useState(false)
  const [isOverdue, setIsOverdue] = useState(false)
  const [fine, setFine] = useState(0);
  const [book, setBook] = useState<BookIssue | null>(null);
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const searchBook = async() => {
    if(!email || !isbn) return;
    // Simulate API call
    setIsSubmitting(true);
    try {
      const res = await axios.post(`/api/v1/book/return`, {email, isbn});

      if(res?.data?.success && res?.data?.issuedBook){
        console.log(res?.data?.issuedBook);
        
        setBookFound(true);
        toast({
          title : res?.data?.message,
          duration : 3000
        });
        setBook(res?.data?.issuedBook);
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast({
          title : error.response?.data?.message || "error while fetching details",
          duration : 3000
          });
      }
      else{
        toast({
          title : "error while fetching details",
          duration : 3000
          });
      }

      
    }finally{
      setIsSubmitting(false);
    }
    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await axios.patch(`/api/v1/book/return`, {email, isbn,
        condition, notes});
        if(res?.data?.success){
          toast({
            title : res?.data?.message
            });
            setTimeout(()=>{
              router.push('/admin')
            },3000);
        }


    } catch (error) {
      if(axios.isAxiosError(error)){
        toast({
          title : error.response?.data?.message || "Error while returning book",
          duration : 3000
          });
      }
      else{
        toast({
          title : "Error while returning book",
          duration : 3000
          });
      }
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Return Book</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Process Book Return</CardTitle>
            <CardDescription>Search for the book or issue ID to process a return.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Book Information</h3>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input placeholder="Enter ISBN of book" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                </div>
                <div className="flex-grow">
                  <Input placeholder="Enter student email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                
              </div>

              <Button type="button" onClick={searchBook} className="bg-black w-full text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>

              {bookFound && book && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-24 bg-muted flex items-center justify-center">
                        <Image src={book?.book?.coverImage || ""} alt="cover" height={100} width={100}/>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{book?.book?.title}</h4>
                        <p className="text-sm text-muted-foreground">{book?.book?.authors?.[0]}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span className="font-medium">ISBN:</span> {book?.book?.isbn}
                          </div>
                          <div>
                            <span className="font-medium">Issue ID:</span> {book?.id}
                          </div>
                          <div>
                            <span className="font-medium">Borrower:</span> {book.user?.name}
                          </div>
                          <div>
                            <span className="font-medium">Issue Date:</span>{new Date(book?.issueDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span> {new Date(book?.dueDate).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            {new Date(book?.dueDate) < new Date() ? (
                              <Badge variant="destructive" className="ml-1 bg-red-400">
                                Overdue
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ml-1">
                                On time
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {bookFound && book && (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Return Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Return Date</Label>
                      <Input id="return-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="book-condition">Book Condition</Label>
                      <Select defaultValue="good" value={condition} onValueChange={(v)=>setCondition(v)}>
                        <SelectTrigger id="book-condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="damaged">Damaged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about the condition of the book or the return process"
                      rows={3}
                      value={notes}
                      onChange={(e)=>setNotes(e.target?.value)}
                    />
                  </div>
                </div>

                {new Date(book?.dueDate) < new Date() && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fine Calculation</h3>
                    <Card className="bg-red-50 dark:bg-red-900/20">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Days Overdue:</span>
                            <span className="font-medium">{getOverdueDetails(book).days} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fine Rate:</span>
                            <span className="font-medium">₹ 10 per day</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Total Fine:</span>
                            <span>₹ {getOverdueDetails(book).fine}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select defaultValue="unpaid">
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="online">Online Payment</SelectItem>
                          <SelectItem value="unpaid">Mark as Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Confirmation</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Borrower</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>To Kill a Mockingbird</TableCell>
                        <TableCell>John Doe (ST12345)</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          {new Date(book?.dueDate) < new Date() ? (
                            <Badge variant="destructive" className="bg-red-400">Overdue - ₹ {getOverdueDetails(book).fine}</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              On time
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !bookFound} className="bg-black text-white">
              {isSubmitting ? "Processing Return..." : "Confirm Return"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

const getOverdueDetails = (book: BookIssue) => {
  const days = Math.max(
    Math.floor((new Date().getTime() - new Date(book.dueDate).getTime()) / (1000 * 60 * 60 * 24)),
    0
  );
  const finePerDay = 10; // ₹5 per day
  const fine = days * finePerDay;
  return { days, fine };
};