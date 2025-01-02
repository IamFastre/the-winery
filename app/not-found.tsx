import { Metadata } from "next";
import { headers } from "next/headers";

import consts from "@/utils/consts";
import { C, RI } from "@/components/C";
import { ErrorPage } from "@/components/Pages";

import styles from './not-found.module.scss';

export const metadata:Metadata = {
  title: `404 • ${consts.name}`,
  description: "No such page was found.",
}

export default function NotFoundPage() {
  const headersList = headers();
  const path = headersList.get("x-request-url");
  const url = path ? new URL(path) : null;

  return (
    <div className={styles.container}>
      <ErrorPage
        message={
          url ?
          (
            url.pathname === '/404' ?
            <>
              Well! <RI>This</RI> page is <C.ACCENT><RI>404</RI></C.ACCENT>, funny guy.
            </>
            :
            <>
              Page <C.ACCENT><RI>'{url.pathname}'</RI></C.ACCENT> does not exist.
            </>
          )
          :
          <>
            The page you're trying to request does not exits.
          </>
        }
        code={404}
        noFill
      />
    </div>
  );
}
