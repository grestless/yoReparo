import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const metadata: Metadata = {
    title: "Admin Panel - MultiTech Pro",
    description: "Panel de administración",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminGuard>
            <div className="min-h-screen flex bg-slate-100">
                <AdminSidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
