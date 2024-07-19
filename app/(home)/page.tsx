import { C } from "@/components/C";
import { Section } from "@/components/Section";
import { getFeedPosts } from "@/supabase/actions/post";
import { getPublicProfile } from "@/supabase/actions/user";
import { PublicProfile } from "@/supabase/actions/types";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  const users:{ [identifier:string]:PublicProfile } = {};
  const { data:feed, error } = await getFeedPosts(20);
  let errorClue:string | null = null;

  if (error)
    errorClue = 'loading feed posts';
  if (feed)
    errorClue = null;

  for (const post of feed ?? []) {
    if (post?.author && !users[post.author]) {
      const { data, error } = await getPublicProfile(post.author);
      
      if (error)
        errorClue = 'loading users info';
      if (data) {
        errorClue = null;
        users[post.author] = data;
      }
    }
  }

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
