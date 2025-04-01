import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const AdminProtectedRoute = async() => {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role != 'ADMIN') {
        redirect('/');
    }
  return (
    null
  )
}

export default AdminProtectedRoute