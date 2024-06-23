import type { Metadata } from "next";

import "@/styles/globals.scss";
import consts from "@/utils/consts";
import { FontFaces } from "@/components";


export const metadata: Metadata = {
  title: consts.name,
  description: "It's Winery DeFastre! Where I whine about shit, not where I make wine.",
};

export default function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <FontFaces />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
