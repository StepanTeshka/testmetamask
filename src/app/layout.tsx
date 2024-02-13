import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Bg } from "@/components/Bg";
import { Web3ModalProvider } from "@/components/Web3ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlockChats",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <Web3ModalProvider>
          <Bg>{children}</Bg>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
