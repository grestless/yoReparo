import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YoReparo - Servicios Técnicos Integrales",
  description: "Soluciones técnicas para hogares y empresas. Climatización, electricidad, gas y más. Profesionales matriculados y garantía escrita.",
  openGraph: {
    title: "YoReparo - Servicios Técnicos Integrales",
    description: "Soluciones técnicas para hogares y empresas. Climatización, electricidad, gas y más.",
    url: "https://multitech-pro.vercel.app",
    siteName: "YoReparo",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YoReparo - Servicios Técnicos Integrales",
    description: "Soluciones técnicas para hogares y empresas. Climatización, electricidad, gas y más.",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
