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

export default function IssueBookPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [bookFound, setBookFound] = useState(false)
  const [userFound, setUserFound] = useState(false)

  const searchBook = () => {
    // Simulate API call
    setTimeout(() => {
      setBookFound(true)
    }, 500)
  }

  const searchUser = () => {
    // Simulate API call
    setTimeout(() => {
      setUserFound(true)
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Book Issued",
        description: "The book has been successfully issued to the student.",
      })
    }, 1500)
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
                  <Input placeholder="Enter ISBN or book title" />
                </div>
                <Button type="button" onClick={searchBook} className="bg-black text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {bookFound && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-24 bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Cover</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">To Kill a Mockingbird</h4>
                        <p className="text-sm text-muted-foreground">By Harper Lee</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span className="font-medium">ISBN:</span> 9780061120084
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> Available
                          </div>
                          <div>
                            <span className="font-medium">Genre:</span> Fiction
                          </div>
                          <div>
                            <span className="font-medium">Copies:</span> 3 available
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
                  <Input placeholder="Enter student ID or name" />
                </div>
                <Button type="button" onClick={searchUser} className="bg-black text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {userFound && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <p className="text-sm text-muted-foreground">Student ID: ST12345</p>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
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
            <Button type="submit" disabled={isSubmitting || !bookFound || !userFound || !date} className="bg-black text-white">
              {isSubmitting ? "Issuing Book..." : "Issue Book"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

