import Link from "next/link";

import { C } from "@/components/C";
import { Section } from "@/components/Section";
import { getCardFeed } from "@/utils/api/card/feed";

import { FeedNavigator } from "./client";
import styles from "./page.module.scss";


export default async function HomePage() {
  const { data:feed, error } = await getCardFeed();

  return (
    <Section title="Home" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      {
        !error ?
          <FeedNavigator posts={feed.posts} users={feed.users} />
        :
          <div className={styles.error}>
            <C.TERTIARY>
              Uh-oh...
            </C.TERTIARY>
            <C.SECONDARY>
              An <C.RED>error</C.RED> has occurred loading feed.
            </C.SECONDARY>
            <C.SECONDARY>
              try <Link href="/">refreshing</Link>?
            </C.SECONDARY>
          </div>
      }
    </Section>
  );
}
