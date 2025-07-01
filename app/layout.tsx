import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner"


// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const IBMPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// Metadata with favicon & apple-touch-icon
export const metadata: Metadata = {
  title: "Imaginify - AI Image Generation",
  description: "Turn your imagination into visuals using our powerful AI image generator.",
  keywords: [
    "AI Image Generator",
    "Text to Image",
    "AI Art Generator",
    "AI Tools",
    "Image Enhancement",
    "Imaginify"
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Ensure this file is in the public folder
  },
  metadataBase: new URL("https://imaginify-ai-image-generation.vercel.app"),
  openGraph: {
    title: "Imaginify - AI Image Generation",
    description: "Create stunning AI-powered images from text prompts.",
    url: "https://imaginify-ai-image-generation.vercel.app",
    siteName: "Imaginify",
    images: [
      {
        url: "/og-image.png", // ✅ Add this image in your public folder
        width: 1200,
        height: 630,
        alt: "Imaginify AI Generated Art Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imaginify - AI Image Generator",
    description: "Generate beautiful images using AI and your creativity.",
    images: ["/og-image.png"],
    creator: "@yourTwitterHandle", // Optional
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: { colorPrimary: "#624cf5" },
      }}
      // ✅ Add new-style redirect props here
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${IBMPlex.variable} antialiased`}
        >
          {children}
          <SpeedInsights />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
