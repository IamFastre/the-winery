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

  if (user === "bad" || user?.id !== searchParams.uuid)
    redirect('/', RedirectType.replace);

  return (
    <div className={styles.container}>
      <Section className={styles.section} containerClassName={styles.sectionContainer}>
        <Header
          title={user ? "Success!" : "Hi?"}
          titleColor={user ? colors.green : colors.red}
          left={"•"}
          right={"•"}
          margin={"15px"}
          noBrackets
        />
        <span className={styles.text}>
          {user ?
          <>
            <h3>
              Great, {user.username}!
            </h3>
            <C.SECONDARY>
              A confirmation email was sent to you at
              <RI> '{user.email}'</RI>.
              <br/>
              now all you have to do is check your inbox!
              <br/>
              <p>
                If you're not signed in automatically just go to the <a href="/login">login page</a>.
              </p>
            </C.SECONDARY>
          </>
          :
          <>
            <p>
              <C.SECONDARY>
                Uhm, it's okay we all get lost sometimes,
                <br/>
                don't beat yourself up over it!
              </C.SECONDARY>
            </p>
            <p>
              You can go to the <a href="/">home page</a>.
            </p>
          </>}
        </span>
      </Section>
      <span className={styles.note}>
        You can (or perhaps should) close this page.
      </span>
    </div>
  );
}
