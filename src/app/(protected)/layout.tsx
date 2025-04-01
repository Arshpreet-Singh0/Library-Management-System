import ProtectedRoute from "@/components/user/ProtectedRoutes";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <>
        <ProtectedRoute />
        {children}
        </>
    )
}