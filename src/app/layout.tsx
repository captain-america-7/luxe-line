import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "LUXE LINE — Where Every Sip Defines Luxury",
  description: "A destination where handcrafted coffee, artisanal cuisine, and timeless design become one unforgettable digital and physical experience.",
  keywords: ["luxury cafe", "luxe line", "cinematic coffee", "gourmet cuisine", "artisan bakery"],
  authors: [{ name: "LUXE LINE Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#0B0B0B] bg-[#F8F4ED] dark:text-[#F8F4ED] dark:bg-[#0B0B0B] transition-colors duration-500 overflow-x-hidden selection:bg-[#C7A46C] selection:text-[#0B0B0B]">
        {children}
      </body>
    </html>
  );
}
