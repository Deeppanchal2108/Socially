
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   < ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar/>
              <main className="py-8">
                <div className="px-4 max-w-7xl mx-auto ">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar/>
                  </div>
                    <div className="lg:col-span-9">
                      
                      {children}
                    </div>
                  </div>

                </div>
            </main>
              
            </div>
          
          </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
