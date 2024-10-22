import { Metadata } from "next";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { C } from "@/components/C";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

export const metadata:Metadata = {
  title: `Error • ${consts.name}`,
  description: `Uh-oh, seems we can't confirm your email address.`,
}

export default async function MailErrorPage({ searchParams }:{searchParams: { [key: string]: string | string[] | undefined }}) {
  const username = searchParams.username ?? "you";

  return (
    <div className={styles.container}>
      <Section className={styles.section} containerClassName={styles.sectionContainer}>
        <Header
          title={"Uh-oh!"}
          titleColor={colors.red}
          left={"•"}
          right={"•"}
          margin={"15px"}
          noBrackets
        />
        <span className={styles.text}>
          <h3>
            Hey, {username}...
          </h3>
          <C.SECONDARY>
            <p>
              Seems an error has occurred while confirming your email, which you know,
              <br/>
              errors aren't supposed to happen.
              <br/>
              But no shame in that, pal! It's probably our fault anyway...
              <br/>
              Or the link has expired and you're too slow, too bad. That's on you.
            </p>
            <p>
              Please retry signing up and if that persists, <a href="https://github.com/IamFastre/the-winery/issues">fill a Github issue</a>.
            </p>
          </C.SECONDARY>
        </span>
      </Section>
      <span className={styles.note}>
        You can (or perhaps should) close this page now.
      </span>
    </div>
  );
}
