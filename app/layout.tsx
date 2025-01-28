import type { Metadata, Viewport } from "next";

import consts from "@/utils/consts";
import { Shortcuts } from "@/providers/Shortcuts";
import { QueryProvider } from "@/providers/Query";
import { Toaster } from "@/providers/Toaster";
import { ModalProvider } from "@/providers/ModalProvider";

import { DARK, LIGHT, SCARLATTA, TUNDRA } from "@/styles/themes";
import { ThemeStyle } from "@/styles/components";
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

export default async function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ============================= THEMES ============================= */}
        <ThemeStyle theme={DARK} />
        <ThemeStyle theme={LIGHT} />
        <ThemeStyle theme={SCARLATTA} />
        <ThemeStyle theme={TUNDRA} />
        {/* ============================= SCRIPTS ============================ */}
        <script src="/static/scripts/local-storage.js" />
        <script src="/static/scripts/theme-updater.js" />
        {/* ============================= OTHERS ============================= */}
        <meta name="google-site-verification" content="c2u4sSYzf3Z23dbDg1eiq_nJzXDm7aLScvANNt59pvI" />
      </head>
      <body>
        <div id="NO-SELECT" tabIndex={0} />
        <Shortcuts>
          <QueryProvider>
            <Toaster>
              <ModalProvider>
                {children}
              </ModalProvider>
            </Toaster>
          </QueryProvider>
        </Shortcuts>
      </body>
    </html>
  );
}
