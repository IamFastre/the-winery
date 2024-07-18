import { Metadata } from "next";

import { getUser, getUserPosts } from "@/utils/server";
import { B, C } from "@/components/C";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

import { UserInfo } from "./client";
import styles from "./styles.module.scss";

export const metadata:Metadata = {
  title: "My Profile • The Winery",
  description: "Edit your profile.",
};

export default async function UserPage() {
  const { data:user  } = await getUser();
  const { data:posts } = await getUserPosts(user?.username ?? "");

  if (!user || !posts)
    return;

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <div className={styles.userBox}>
        <UserInfo user={user} />
        <div className={styles.dataBox}>
          <div className={styles.data}>
            <span className={styles.dataItem}>
              <C.QUINARY>
                {posts.length >= 2 ? "cards" : "card"}
              </C.QUINARY>
              {': '}
              <B>
                {posts.length}
              </B>
            </span>
          </div>
        </div>
      </div>
      <hr/>
      <div className={styles.cardsHolder}>
        <div className={styles.cards}>
          {posts.map(post => (
            <Card
              title={post.title}
              content={post.content}
              timestamp={post.timestamp}
              key={post.id}
              centered
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
