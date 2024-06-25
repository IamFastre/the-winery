import type { Metadata } from "next";

import "@/styles/globals.scss";
import consts from "@/utils/consts";


export const metadata: Metadata = {
  title: consts.name,
  description: "Welcome to The Winery where, no sadly, we don't make wine, but where we whine!",
};

export default function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
