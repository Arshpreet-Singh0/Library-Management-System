import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  BookCheck,
  Clock,
  Search,
  BookMarked,
  Award,
  BookText,
  Bookmark,
  ArrowRight,
  Bell,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="space-y-16 ">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg -z-10 bg-gray-100 " />
        <div className="container px-4 py-16 flex flex-col lg:flex-row items-center gap-8 lg:w-[80%] mx-auto">
          <div className="w-full lg:w-1/2 space-y-6 ">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to the College Library Management System
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover, borrow, and manage your library resources all in one place. Access thousands of books and
              resources to support your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books">
                <Button size="lg" className="gap-2 bg-gray-200">
                  <Search className="h-5 w-5" />
                  Browse Books
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2 bg-black text-white">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
              <Image
                src="https://media.istockphoto.com/id/1499883210/photo/word-lms-with-learning-management-system-related-icons-learning-management-system-concept-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=KSd8vENVixvJoJU2uggZ8pmhznuLVUqbFj92gnlbxLE="
                alt="Library"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4 w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,245</div>
              <p className="text-xs text-muted-foreground">Across 50+ genres</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,573</div>
              <p className="text-xs text-muted-foreground">Students and faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Books Issued</CardTitle>
              <BookCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">829</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Digital Resources</CardTitle>
              <BookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,124</div>
              <p className="text-xs text-muted-foreground">E-books and journals</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features & Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our library management system offers a comprehensive set of tools to enhance your academic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] mx-auto">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Book Catalog</CardTitle>
              <CardDescription>
                Browse our extensive collection of books, journals, and research papers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Advanced search filters
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Category and genre browsing
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Book availability status
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/books" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse Catalog
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Book Reservation</CardTitle>
              <CardDescription>Reserve books in advance and get notified when they're available.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Easy reservation process
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Email notifications
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Priority waitlist system
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Reserve Books
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Loan Management</CardTitle>
              <CardDescription>Track your borrowed books, due dates, and manage returns.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Due date reminders
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Online renewal options
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Fine management
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/my-books" className="w-full">
                <Button variant="outline" className="w-full">
                  Manage Loans
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with personalized alerts and announcements.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Due date reminders
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  New book arrivals
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Library event announcements
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/notifications" className="w-full">
                <Button variant="outline" className="w-full">
                  View Notifications
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Reading Lists</CardTitle>
              <CardDescription>Create and manage personal reading lists and recommendations.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Custom reading lists
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Course-specific collections
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Shareable lists with peers
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/reading-lists" className="w-full">
                <Button variant="outline" className="w-full">
                  Create Lists
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Research Support</CardTitle>
              <CardDescription>Access research tools, citation help, and academic resources.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Citation generators
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Research databases
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Academic writing guides
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/research" className="w-full">
                <Button variant="outline" className="w-full">
                  Research Tools
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section> */}

      {/* How It Works Section */}
      {/* <section className="container mx-auto px-4 w-[80%] ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with our library system is easy. Follow these simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up with your student ID and email to access all library features.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Browse & Reserve</h3>
            <p className="text-muted-foreground">
              Search our catalog, find the books you need, and reserve them online.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pick Up & Return</h3>
            <p className="text-muted-foreground">
              Visit the library to collect your books and return them before the due date.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </div>
      </section> */}

      {/* New Arrivals Section */}
      {/* <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground">Recently added to our collection</p>
          </div>
          <Link href="/books?sort=newest" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All New Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((book) => (
            <Card key={book} className="overflow-hidden flex flex-col">
              <div className="aspect-[2/3] relative">
                <Image
                  src={`/placeholder.svg?height=300&width=200&text=Book ${book}`}
                  alt={`New Book ${book}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">New Book Title {book}</CardTitle>
                <p className="text-sm text-muted-foreground">Author Name</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  A brief description of this new and exciting book that has just arrived at our library.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/books/${book}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Announcements Section */}
      {/* <section className="container w-[80%] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Library Announcements</h2>
            <p className="text-muted-foreground">Stay updated with the latest news</p>
          </div>
          <Link href="/announcements" className="mt-4 md:mt-0">
            <Button variant="outline">
              All Announcements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Extended Hours During Finals Week</CardTitle>
              <CardDescription>Posted on March 25, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The library will be open extended hours (7:00 AM - 2:00 AM) during finals week to accommodate student
                study needs.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/announcements/1">
                <Button variant="ghost" size="sm">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Research Database Available</CardTitle>
              <CardDescription>Posted on March 20, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We're pleased to announce that the ScienceDirect database is now available for all students and faculty
                members.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/announcements/2">
                <Button variant="ghost" size="sm">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 w-[80%]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from students and faculty about their experience with our library system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">JS</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Computer Science Student</p>
                </div>
              </div>
              <p className="text-center italic">
                "The library system has made it so much easier to find and reserve books for my research projects. I
                love the notification feature!"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">DP</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Dr. Peterson</h4>
                  <p className="text-sm text-muted-foreground">Faculty, Literature Department</p>
                </div>
              </div>
              <p className="text-center italic">
                "Managing course reading lists has never been easier. My students can access all required materials with
                just a few clicks."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold">MJ</span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-sm text-muted-foreground">Engineering Graduate Student</p>
                </div>
              </div>
              <p className="text-center italic">
                "The research support tools have been invaluable for my thesis work. I especially appreciate the
                citation generator feature."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 py-16 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students and faculty members who are already using our library management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/books">
              <Button size="lg" variant="outline">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-12">
        <div className="container mx-auto px-4 ">
          <div className="flex justify-between w-[60%] mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-4">Library Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 8:00 PM</span>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/books" className="hover:underline">
                    Book Catalog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Research Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Library Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div> */}
{/* 
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tutorials" className="hover:underline">
                    How-to Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/citation" className="hover:underline">
                    Citation Guides
                  </Link>
                </li>
                <li>
                  <Link href="/databases" className="hover:underline">
                    Research Databases
                  </Link>
                </li>
                <li>
                  <Link href="/interlibrary" className="hover:underline">
                    Interlibrary Loans
                  </Link>
                </li>
                <li>
                  <Link href="/printing" className="hover:underline">
                    Printing Services
                  </Link>
                </li>
              </ul>
            </div> */}

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <address className="not-italic space-y-2">
                <p>Chandigarh University Library</p>
                <p>Mohali, Punjab</p>
                {/* <p>College Town, CT 12345</p> */}
                <p className="mt-4">Phone: 8872571023</p>
                <p>Email: library@university.edu</p>
              </address>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} College Library Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
