type Book = {
    id: string;
    title: string;
    authors: string[];
    isbn: string;
    genre: string;
    publishedYear: number;
    publisher: string;
    description: string;
    totalCopies: number;
    availableCopies: number;
    coverImage: string;
    createdAt: string;
    updatedAt: string;
    location?: string | null;
  };
  
  // Type for a User
  type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    role: "ADMIN" | "USER"; // You can add more roles if needed
    image: string;
    fine: number;
    createdAt: string;
    updatedAt: string;
  };
  
  // Type for a Book Issue
  export type BookIssue = {
    id: string;
    bookId: string;
    userId: string;
    issueDate: string;
    dueDate: Date;
    returnDate?: string | null;
    fine: number;
    status: "ACTIVE" | "RETURNED"; // You can add more statuses if needed
    createdAt: string;
    updatedAt: string;
    book : Book,
    user : User
  };