import type { Metadata, Viewport } from "next";

import consts from "@/utils/consts";
import { getUserInfo } from "@/utils/api/user/info";
import { Shortcuts } from "@/providers/Shortcuts";
import { QueryProvider } from "@/providers/Query";
import { Toaster } from "@/providers/Toaster";
import { ModalProvider } from "@/providers/ModalProvider";

import { MakeTheme, DARK, SCARLATTA, LIGHT } from "@/styles/themes";
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
  const { data } = await getUserInfo('self');

  return (
    <html lang="en" style={MakeTheme(data?.gender === 'female' ? SCARLATTA : data?.gender === 'toaster' ? LIGHT : DARK)}>
      <head>
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
