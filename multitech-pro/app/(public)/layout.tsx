import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceProvider } from "@/context/ServiceContext";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ServiceProvider>
            <Header />
            <main className="min-h-screen pt-16 bg-slate-50">
                {children}
            </main>
            <Footer />
        </ServiceProvider>
    );
}
