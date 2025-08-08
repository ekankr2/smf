import type { Metadata } from "next";
import "./globals.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import KakaoFloatingButton from "./components/KakaoFloatingButton";

export const metadata: Metadata = {
  title: "SMF - 과일 도소매",
  description: "농장과 소비자를 연결하는 과일 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className="">
        <header className="shadow-sm h-16 sticky mx-auto px-3.5 ">
          <nav className="flex items-center h-full justify-between text-24">
            <GiHamburgerMenu />
            <FaMagnifyingGlass />
          </nav>
        </header>
        <main className="w-full md:max-w-[712px] flex mx-auto px-3.5">
          {children}
        </main>
        <footer className=""></footer>
        <KakaoFloatingButton />
      </body>
    </html>
  );
}
