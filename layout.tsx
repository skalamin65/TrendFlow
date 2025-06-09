import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ChatbotButton from "@/components/chatbot-button"
import { WishlistProvider } from "@/components/wishlist-provider"
import CursorEffect from "@/components/cursor-effect"
import WishlistFloatingIndicator from "@/components/wishlist-floating-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrendFlow | Trending Products for Fashion, Tech, Home & Fitness",
  description:
    "Discover the latest trending products across fashion, tech gadgets, home decor, and fitness gear at TrendFlow. Free shipping on orders over $50.",
  keywords: "trending products, fashion, tech gadgets, home decor, fitness gear, online shopping",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WishlistProvider>
            <CursorEffect />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatbotButton />
              <WishlistFloatingIndicator />
            </div>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
