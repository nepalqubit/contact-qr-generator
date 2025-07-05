import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Contact QR Generator - Create Scannable Contact Cards",
  description: "Generate QR codes for your contact information. Create professional vCard QR codes that work seamlessly across all devices and QR code readers.",
  keywords: "QR code, contact card, vCard, business card, contact information, QR generator",
  authors: [{ name: "Santosh Baral" }],
  creator: "Santosh Baral",
  publisher: "Techzen Corporation Pvt. Ltd.",
  openGraph: {
    title: "Contact QR Generator",
    description: "Create scannable QR codes for your contact information",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact QR Generator",
    description: "Create scannable QR codes for your contact information",
  },

  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


export const viewport = {
  width: "device-width",
  initialScale: 1,
};
