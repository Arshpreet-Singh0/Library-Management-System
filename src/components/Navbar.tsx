"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Menu, User, DollarSign } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./mode-toggle"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/books" className="text-lg font-medium">
                  Browse Books
                </Link>
                {session && session.user.role=="ADMIN" && (
                  <>
                    <Link href="/admin" className="text-lg font-medium">
                      Admin Dashboard
                    </Link>
                    <Link href="/admin/books" className="text-lg font-medium">
                      Manage Books
                    </Link>
                    {/* <Link href="/admin/users" className="text-lg font-medium">
                      Manage Users
                    </Link> */}
                  </>
                )}
                {session?.user && (
                  <>
                    <Link href="/my-books" className="text-lg font-medium">
                      My Books
                    </Link>
                    <Link href="/my-books/fines" className="text-lg font-medium">
                      My Fines
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl hidden md:inline-block">Library System</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/books" className="text-sm font-medium">
              Browse Books
            </Link>
            {session && session.user.role=="ADMIN"  && (
              <>
                <Link href="/admin" className="text-sm font-medium">
                  Admin Dashboard
                </Link>
                <Link href="/admin/books" className="text-sm font-medium">
                  Manage Books
                </Link>
                {/* <Link href="/admin/users" className="text-sm font-medium">
                  Manage Users
                </Link> */}
              </>
            )}
            {session?.user && (
              <>
                <Link href="/my-books" className="text-sm font-medium">
                  My Books
                </Link>
                <Link href="/my-books/fines" className="text-sm font-medium">
                  My Fines
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {/* <p>{session.user?.name}</p> */}
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/my-books")}>My Books</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/my-books/fines")}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  My Fines
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

