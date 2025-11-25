import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA APOD Explorer",
  description:
    "Explore NASA's Astronomy Picture of the Day with a beautiful, modern interface",
  keywords: ["NASA", "APOD", "Astronomy", "Space", "Pictures"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t bg-white/50 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                Built with Next.js • Data from{" "}
                <a
                  href="https://api.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline">
                  NASA Open APIs
                </a>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                NASA APOD Explorer © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
