import { Metadata } from "next";
import Image from "next/image";

import { getPublicProfile } from "@/supabase/actions/user";
import { getUserPosts } from "@/supabase/actions/post";
import { Section } from "@/components/Section";
import { B, C } from "@/components/C";
import { Card } from "@/components/Card";
import { Bio } from "@/components/Bio";

import { DataBox } from "../../client";
import styles from "../../styles.module.scss";


interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }:Props) : Promise<Metadata> {
  const username = params.username;
  const { data:profile  } = await getPublicProfile(params.username);

  if (profile)
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
  const { data:profile } = await getPublicProfile(params.username);
  const { data:posts } = await getUserPosts(profile?.username ?? "");

  if (!profile || !posts)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <div className={styles.userBox}>
        <Image
          alt={`${profile.username}'s profile picture.`}
          src={profile.avatar}
          width={128}
          height={128}
          className={styles.avatar}
        />
        <div className={styles.textStuff}>
          <div className={styles.names}>
            <span>
              {profile.display_name ?? profile.username}
            </span>
            <span>
              <C.QUINARY>
                u:
              </C.QUINARY>
              <C.ACCENT>
                {profile.username}
              </C.ACCENT>
            </span>
          </div>
          <Bio content={profile.bio} />
        </div>
        <DataBox cards={posts.length} joined={profile.created_at} />
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
