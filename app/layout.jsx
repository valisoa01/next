// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecipeList from "./RecipeList/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe Book",
  description: "Simple recipe app with Next.js",
};

export default function RootLayout({ children }) {
  const recipes = [ /* your JSON array here */ ];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <RecipeList recipes={recipes} />
        {children} {/* Keep this if you want other pages */}
      </body>
    </html>
  );
}