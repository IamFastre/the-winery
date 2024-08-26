import { C } from "@/components/C";
import { Section } from "@/components/Section";
import { getFeedPosts } from "@/supabase/actions/post";
import { getAuthorsMap } from "@/supabase/actions/user";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  let errorClue:string | null = null;

  const { data:feed, error } = await getFeedPosts(20);
  errorClue ??= error ? 'loading feed posts' : null;

  const { data:users, hasError } = await getAuthorsMap((feed ?? []).map(e => e.author!));
  errorClue ??= hasError ? 'loading users info' : null;

  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      {
        !errorClue ?
          <FeedNavigator feed={feed!} users={users} />
        :
        <>
          <div className={styles.error}>
            <C.TERTIARY>
              Uh-oh...
            </C.TERTIARY>
            <C.SECONDARY>
              An <C.RED>error</C.RED> has occurred {errorClue}.
            </C.SECONDARY>
            <C.SECONDARY>
              try <a href="/">refreshing</a>?
            </C.SECONDARY>
          </div>
        </>
      }
    </Section>
  );
}
