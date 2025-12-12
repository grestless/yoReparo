import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YoReparo - Servicios Técnicos Integrales",
  description: "Soluciones técnicas profesionales para hogares y empresas en Argentina. Especialistas en climatización, electricidad, gas, plomería y más. Garantía escrita y atención inmediata.",
  keywords: ["reparación", "servicio técnico", "hogar", "empresa", "climatización", "electricidad", "gasista", "plomero", "aire acondicionado", "mantenimiento", "Argentina", "YoReparo"],
  authors: [{ name: "YoReparo Team" }],
  creator: "YoReparo",
  publisher: "YoReparo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://multitech-pro.vercel.app",
  },
  openGraph: {
    title: "YoReparo - Servicios Técnicos Integrales",
    description: "Soluciones técnicas confiables para tu hogar o empresa. Expertos en reparaciones y mantenimiento.",
    url: "https://multitech-pro.vercel.app",
    siteName: "YoReparo",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: '/og-image.jpg', // Assuming we might add this later or it exists, otherwise it's a placeholder
        width: 1200,
        height: 630,
        alt: 'YoReparo Servicios Técnicos',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YoReparo - Servicios Técnicos Integrales",
    description: "Soluciones técnicas profesionales. Garantía y confianza.",
    images: ['/og-image.jpg'], // Consistent with OG
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png', // Next.js convention, good to be explicit
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
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
