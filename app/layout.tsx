import type { Metadata, Viewport } from "next";

import consts from "@/utils/consts";
import { QueryProvider } from "@/providers/Query";
import { Toaster } from "@/providers/Toaster";
import { ModalProvider } from "@/providers/ModalProvider";

import "@/styles/globals.scss";


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
        <div id="NO-SELECT" tabIndex={0} />
        <QueryProvider>
          <Toaster>
            <ModalProvider>
              {children}
            </ModalProvider>
          </Toaster>
        </QueryProvider>
      </body>
    </html>
  );
}
