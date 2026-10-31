import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/providers/AuthProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AIChatWidget from "@/components/ui/AIChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "Cabinet BMC — Business Marketing & Coaching",
    template: "%s | Cabinet BMC",
  },
  description: "Cabinet specialise en Developpement et Animation Commerciale. Votre partenaire en excellence commerciale au Benin.",
  keywords: ["cabinet conseil", "developpement commercial", "formation commerciale", "coaching", "Benin", "BMC"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Cabinet BMC",
    title: "Cabinet BMC — Business Marketing & Coaching",
    description: "Votre partenaire en excellence commerciale au Benin. Audit, formation, force de vente, coaching et communication.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet BMC — Business Marketing & Coaching",
    description: "Votre partenaire en excellence commerciale au Benin.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <AIChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
