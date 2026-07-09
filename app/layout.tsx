import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppPopup, Footer, Header } from "./components";

const Involve = localFont({
  src: [
    { path: "./fonts/Involve-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Involve-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Involve-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Involve-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-family",
  display: "swap",
});

const Bounded = localFont({
  src: [
    { path: "./fonts/Bounded-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Bounded-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Bounded-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Bounded-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/Bounded-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Bounded-ExtraBold.otf", weight: "900", style: "normal" },
  ],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RiftVL",
  description: "RiftVL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${Involve.variable} ${Bounded.variable} h-full antialiased`}
    >
      <body className="flex flex-col w-full min-h-screen">
          <Header />
        <main className="flex-1">
          {children}
        </main>
        <div>footer</div>
          {/* <Footer /> */}
        <AppPopup />
      </body>
    </html>
  );
}
