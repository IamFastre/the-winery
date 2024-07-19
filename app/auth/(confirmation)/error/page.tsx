import { redirect, RedirectType } from "next/navigation";

import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { C, RI } from "@/components/C";

import { createClient } from "@/supabase/admin";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

export default async function CheckMailPage({ searchParams }:{searchParams: { [key: string]: string | string[] | undefined }}) {
  const supabase = createClient();
  let  user = searchParams.uuid
             ? (await supabase.from('users').select('username, email, id').eq('id', searchParams.uuid).single()).data ?? "bad" as const
             : null;

  if (user === "bad")
    redirect('/', RedirectType.replace);

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
            Hey, {user?.username ?? "you"}...
          </h3>
          <C.SECONDARY>
            <p>
              Seems an error has occurred while doing that, which you know,
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
        You can (or perhaps should) close this page.
      </span>
    </div>
  );
}
