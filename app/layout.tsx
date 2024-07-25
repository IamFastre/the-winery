import type { Metadata, Viewport } from "next";

import consts from "@/utils/consts";
import "@/styles/globals.scss";
import { Toaster } from "@/providers/Toaster";


export const metadata:Metadata = {
  title: consts.name,
  description: `Welcome to ${consts.name} where, no sadly, we don't make wine, but where we whine!`,
};

export const viewport:Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: 'device-width',
}

export default function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Toaster>
          {children}
        </Toaster>
      </body>
    </html>
  );
}
