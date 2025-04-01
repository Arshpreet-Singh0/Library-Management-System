import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen} from "lucide-react"
import Image from "next/image";
import axios from "axios";
import { APP_URL } from "@/config/config";
import { Book } from "@prisma/client";

const getBook = async(isbn : string)=>{
    try {
        const res = await axios.get(`${APP_URL}/api/v1/book/${isbn}`);

        return res.data?.book;
    } catch (error) {
        console.log(error);
        
        return null;
    }
}

export default async function BookDetailPage({ params }: { params: Promise<{ isbn: string }> }) {
  const isbn = (await params).isbn;
  const book : Book | null = await getBook(isbn);

  if(!book){
    return <div>Book not found</div>
  }

  return (
    <div className="space-y-8 p-10">
      <div className="flex flex-col md:flex-row gap-8 w-[80%] mx-auto">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-4 space-y-4">
            <Button className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Borrow Book
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    {book.availableCopies > 0 ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Unavailable
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Copies:</span>
                    <span>
                      {book.availableCopies} of {book.totalCopies}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <span>{book.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ISBN:</span>
                    <span>{book.isbn}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground">by {book?.authors.join(", ")}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{book.genre}</Badge>
            <Badge variant="outline">{book.publishedYear}</Badge>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Publisher:</span>
                  <span>{book.publisher}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Published Year:</span>
                  <span>{book.publishedYear}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span>{book.genre}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span>{book.isbn}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Availability</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Total Copies:</span>
                  <span>{book.totalCopies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Available Copies:</span>
                  <span>{book.availableCopies}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Shelf Location:</span>
                  <span>{book.location}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Loan Period:</span>
                  <span>7 days</span>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reviews</h2>

            {book.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{review.user}</span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Link href={`/books/${book.id}/reviews`}>
              <Button variant="outline" className="w-full">
                See All Reviews
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

