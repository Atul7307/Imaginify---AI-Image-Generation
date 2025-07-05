import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const IBMPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "Imaginify - AI Image Generation",
  description: "Turn your imagination into visuals using our powerful AI image generator.",
  keywords: [
    "AI Image Generator",
    "Text to Image",
    "AI Art Generator",
    "AI Tools",
    "Image Enhancement",
    "Imaginify",
  ],
  metadataBase: new URL("https://imaginify-ai-image-generation.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Imaginify - AI Image Generation",
    description: "Create stunning AI-powered images from text prompts.",
    url: "https://imaginify-ai-image-generation.vercel.app",
    siteName: "Imaginify",
    images: [
      {
        url: "/og-image.jpg", // ✅ Make sure this is in /public
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
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{ variables: { colorPrimary: "#624cf5" } }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="canonical" href="https://imaginify-ai-image-generation.vercel.app" />
          <link rel="lazy" href="/og-image.jpg" as="image" />  
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} ${IBMPlex.variable} antialiased`}>
          {children}
          <SpeedInsights />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
