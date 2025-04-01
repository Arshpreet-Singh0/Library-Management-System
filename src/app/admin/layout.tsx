import AdminProtectedRoute from "@/components/admin/ProtectedRoute";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <>
        <AdminProtectedRoute />
        {children}
        </>
    )
}