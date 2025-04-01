import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const ProtectedRoute = async() => {
    const session = await getServerSession(authOptions);
    if (!session ) {
        redirect('/');
    }
  return (
    null
  )
}

export default ProtectedRoute;