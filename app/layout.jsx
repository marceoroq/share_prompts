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
      </body>
    </html>
  );
};

export default RootLayout;
