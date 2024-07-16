import { Metadata } from "next";
import Image from "next/image";

import { getAvatarUrl, getUserByIdentifier, getUserPosts } from "@/utils/server";
import { Section } from "@/components/Section";
import { B, C } from "@/components/C";
import { Card } from "@/components/Card";

import styles from "./styles.module.scss";
import { Bio } from "@/components/Bio";


interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }:Props) : Promise<Metadata> {
  const username = params.username;
  const { data:user  } = await getUserByIdentifier(params.username);

  if (user)
    return {
      title: `u:${username} • The Winery`,
      description: `${username}'s profile page.`,
    };
  else
    return {
      title: 'Not Found • The Winery',
      description: `Requested user '${username}', was not found.`,
    };
}

export default async function UserPage({ params }:Props) {
  const { data:user  } = await getUserByIdentifier(params.username);
  const { data:posts } = await getUserPosts(user?.username ?? "");

  if (!user || !posts)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <div className={styles.userBox}>
        <Image
          alt={`${user.username}'s profile picture.`}
          src={await getAvatarUrl(params.username)}
          width={128}
          height={128}
          className={styles.avatar}
        />
        <div className={styles.textStuff}>
          <div className={styles.names}>
            <span>
              {user.display_name ?? user.username}
            </span>
            <span>
              <C.QUINARY>
                u:
              </C.QUINARY>
              <C.ACCENT>
                {user.username}
              </C.ACCENT>
            </span>
          </div>
          <Bio
            content={user.bio}
          />
        </div>
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
