"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Book, User } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function IssueBookPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [bookFound, setBookFound] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [email, setEmail] = useState("");
  const [isBookSearched, setIsBookSearched] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [userFound, setUserFound] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [issueDays, setIssueDays] = useState("");
  const router = useRouter();

  const searchBook = () => {
    // Simulate API call
    setTimeout(() => {
      setBookFound(true)
    }, 500)
  }

  const handleBookSearch = async()=>{
    if(!isbn) return;
    setIsBookSearched(true);
    try {
      const res = await axios.get(`/api/v1/book/${isbn}`);
      
      if(res?.data?.success && res.data.book!=null){
        setBookFound(true );
        setBook(res.data.book);
      }
      else{
        toast({
          title : "Book Not found , ensure isbn is correct",
        })
      }

    } catch (error) {
      toast({
        title : "error fetching book, ensure isbn is correct",
      })

    }
  }

  const searchUser = async() => {
    // Simulate API call
    if(!email) return;

    try {
      const res = await axios.get(`/api/v1/user/${email}`);
      console.log(res);
      

      if(res?.data?.success && res?.data?.user){
        setUserFound(true)
        setUser(res?.data?.user);
      }
      else{
        toast({
          title : "User Not found , ensure email id is correct",
        })
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast({
          title : error.response?.data?.message || "error fetching user",
        })
      }
      else{
        toast({
          title : "error fetching user",
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!user || !book || !issueDays) return;
    setIsSubmitting(true)
    try {
      const res = await axios.post('/api/v1/book/issue', {userId : user.id, bookId : book.id, issueDays});

      if(res.data?.success){
        toast({
          title : res?.data?.message || "Book Issued Successfully",
          });
        
          setTimeout(()=>{
            router.push('/admin')
          },3000);

      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast({
          title : error?.response?.data?.message,
        })
      }
      else{
        toast({
          title : "Error while issuing book",
        })
      }
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-5">
      <h1 className="text-3xl font-bold mb-6">Issue Book</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Issue Book to Student</CardTitle>
            <CardDescription>Search for a book and student to issue the book.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Book Information</h3>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input placeholder="Enter ISBN" value={isbn} onChange={(e)=>setIsbn(e.target.value)}/>
                </div>
                <Button type="button" onClick={handleBookSearch} className="bg-black text-white" >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {bookFound && book && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-24 bg-muted flex items-center justify-center">
                        <Image src={book?.coverImage || ""} alt="cover" width={100} height={100}/>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">To Kill a Mockingbird</h4>
                        <p className="text-sm text-muted-foreground">By Harper Lee</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span className="font-medium">ISBN:</span>{book.isbn}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> {book.availableCopies>0 ? "Available" : "Not Available"}
                          </div>
                          <div>
                            <span className="font-medium">Genre:</span> {book.genre}
                          </div>
                          <div>
                            <span className="font-medium">Copies:</span> {book.availableCopies} available
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Student Information</h3>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input placeholder="Enter student email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <Button type="button" onClick={searchUser} className="bg-black text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {userFound && user && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">Student email : {user.email}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span className="font-medium">Department:</span> Computer Science
                          </div>
                          <div>
                            <span className="font-medium">Books Borrowed:</span> 2
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Issue Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input id="issue-date" value={format(new Date(), "PPP")} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="number" value={issueDays} onChange={(e)=>setIssueDays(e.target.value)} placeholder="e.g. 7"/>
                 
                </div>
              </div>
            </div>

            {bookFound && userFound && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Confirmation</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>To Kill a Mockingbird</TableCell>
                      <TableCell>John Doe (ST12345)</TableCell>
                      <TableCell>{format(new Date(), "PPP")}</TableCell>
                      <TableCell>{date ? format(date, "PPP") : "Not selected"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !bookFound || !userFound || !issueDays} className="bg-black text-white">
              {isSubmitting ? "Issuing Book..." : "Issue Book"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

