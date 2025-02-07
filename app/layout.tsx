import type { Metadata, Viewport } from "next";

import consts from "@/utils/consts";
import { AppProvider } from "@/providers/AppContext";
import { Shortcuts } from "@/providers/Shortcuts";
import { QueryProvider } from "@/providers/Query";
import { Toaster } from "@/providers/Toaster";
import { ModalProvider } from "@/providers/ModalProvider";

import { TUII_DARK, TUII_LIGHT, SCARLATTA_WINE, SCARLATTA_ROSE, TUNDRA } from "@/styles/themes";
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
        <ThemeStyle theme={TUII_DARK} />
        <ThemeStyle theme={TUII_LIGHT} />
        <ThemeStyle theme={SCARLATTA_WINE} />
        <ThemeStyle theme={SCARLATTA_ROSE} />
        <ThemeStyle theme={TUNDRA} />
        {/* ============================= SCRIPTS ============================ */}
        <script src="/static/scripts/local-storage.js" />
        <script src="/static/scripts/theme-updater.js" />
        {/* ============================= OTHERS ============================= */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="c2u4sSYzf3Z23dbDg1eiq_nJzXDm7aLScvANNt59pvI" />
      </head>
      <body>
        <div id="NO-SELECT" tabIndex={0} />
        <AppProvider>
          <Shortcuts>
            <QueryProvider>
              <Toaster>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </Toaster>
            </QueryProvider>
          </Shortcuts>
        </AppProvider>
      </body>
    </html>
  );
}
