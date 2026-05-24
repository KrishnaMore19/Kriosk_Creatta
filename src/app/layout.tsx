import type { Metadata, Viewport } from "next";
// @ts-ignore: allow global CSS side-effect import
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Kriosk Creata — Crafting Brands for Success",
  description:
    "Leading creative agency in Ahmedabad, Gujarat. Expert services in graphic design, branding, web development, app development, and digital marketing. 8000+ projects delivered since 2001.",
  keywords:
    "creative agency ahmedabad, graphic design, branding, web development, digital marketing, kriosk creata",
};

// ✅ viewport must be a separate export in Next.js 13+ App Router
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cream text-brand-charcoal font-body antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}