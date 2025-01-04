import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "PromptVerse",
  description:
    "Discover, create, and share optimized prompts for AI models like GPT and DALL·E. Join a vibrant community and enhance your AI-driven creativity!",
  openGraph: {
    title: "PromptVerse",
    description:
      "Discover, create, and share optimized prompts for AI models like GPT and DALL·E. Join a vibrant community and enhance your AI-driven creativity!",
    url: "https://share-prompts-henna.vercel.app/",
    siteName: "PromptVerse",
    images: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1200,
        height: 630,
        alt: "laptop with code editing application open on a white desktop",
      },
    ],
    type: "website",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}>
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <Provider>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <footer className="flex justify-center text-xs py-2">Based on MasteryJS Course.</footer>
      </body>
    </html>
  );
};

export default RootLayout;
