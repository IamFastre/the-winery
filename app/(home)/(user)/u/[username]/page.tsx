import { Metadata } from "next";

import consts from "@/utils/consts";
import { getProfile, getPublicProfile } from "@/supabase/actions/user";
import { getUserPosts } from "@/supabase/actions/post";
import { Section } from "@/components/Section";
import { addLogoBadge } from "@/utils/server";

import { CardList, ProfileInfo } from "./server";
import { DataBox, ProfileEditor } from "./client";
import styles from "./styles.module.scss";
import Image from "next/image";


interface Props {
  params: { username: string }
}

export async function generateMetadata({ params }:Props) : Promise<Metadata> {
  const username = params.username;
  const { data:profile  } = await getPublicProfile(params.username);
  
  if (profile) {
    const profileWithBadge = await addLogoBadge(profile.avatar);
    return {
      title: `u:${username} • ${consts.name}`,
      description: `${username}'s profile page.`,
      icons: {
        icon: profileWithBadge!,
        apple: profileWithBadge!,
      },
    };
  } else {
    return {
      title: `Not Found • ${consts.name}`,
      description: `Requested user '${username}', was not found.`,
    };
  }
}

export default async function UserPage({ params }:Props) {
  const self = (await getProfile()).data;

  if (!self)
    return;

  const isSelf  = self.identifier === params.username.toLowerCase();
  const other = !isSelf ? (await getPublicProfile(params.username)).data : null;
  const profile = isSelf ? self : other;
  const posts = profile ? (await getUserPosts(profile.username)).data : null;

  if (!profile || !posts)
    return; // not found

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Image
        src={profile.avatar}
        alt={''}
        width={256}
        height={256}
        className={styles.avatarBlur}
      />
      <div className={styles.userBox}>
        { isSelf ? <ProfileEditor profile={self} /> : <ProfileInfo profile={profile} /> }
        <DataBox cards={posts.length} joined={profile.created_at} />
      </div>
      <hr/>
      <CardList posts={posts} />
    </Section>
  );
}
