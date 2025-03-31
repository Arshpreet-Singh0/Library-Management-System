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

export default function ReturnBookPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookFound, setBookFound] = useState(false)
  const [isOverdue, setIsOverdue] = useState(false)
  const [fine, setFine] = useState(0)

  const searchBook = () => {
    // Simulate API call
    setTimeout(() => {
      setBookFound(true)
      // Randomly determine if book is overdue
      const overdue = Math.random() > 0.5
      setIsOverdue(overdue)
      if (overdue) {
        // Calculate a random fine between $1 and $10
        setFine(Number.parseFloat((Math.random() * 9 + 1).toFixed(2)))
      }
    }, 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Book Returned",
        description: isOverdue
          ? `The book has been successfully returned. A fine of $${fine.toFixed(2)} has been recorded.`
          : "The book has been successfully returned.",
      })
      // Reset form
      setBookFound(false)
      setIsOverdue(false)
      setFine(0)
    }, 1500)
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
                  <Input placeholder="Enter ISBN, book title, or issue ID" />
                </div>
                <Button type="button" onClick={searchBook}>
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
                            <span className="font-medium">Issue ID:</span> ISS-12345
                          </div>
                          <div>
                            <span className="font-medium">Borrower:</span> John Doe (ST12345)
                          </div>
                          <div>
                            <span className="font-medium">Issue Date:</span> Mar 22, 2025
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span> Mar 29, 2025
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            {isOverdue ? (
                              <Badge variant="destructive" className="ml-1">
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

            {bookFound && (
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
                      <Select defaultValue="good">
                        <SelectTrigger id="book-condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
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
                    />
                  </div>
                </div>

                {isOverdue && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fine Calculation</h3>
                    <Card className="bg-red-50 dark:bg-red-900/20">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Days Overdue:</span>
                            <span className="font-medium">{Math.floor(Math.random() * 10) + 1} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fine Rate:</span>
                            <span className="font-medium">$0.50 per day</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Total Fine:</span>
                            <span>${fine.toFixed(2)}</span>
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
                          {isOverdue ? (
                            <Badge variant="destructive">Overdue - ${fine.toFixed(2)}</Badge>
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
            <Button type="submit" disabled={isSubmitting || !bookFound}>
              {isSubmitting ? "Processing Return..." : "Confirm Return"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

