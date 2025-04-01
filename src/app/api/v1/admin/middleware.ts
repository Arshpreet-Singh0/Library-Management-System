import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get session
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and is an ADMIN
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Specify routes where this middleware should apply
export const config = {
  matcher: ["/api/admin/:path*"], // Apply only to /api/admin routes
};
