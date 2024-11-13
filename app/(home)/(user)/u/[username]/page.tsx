import { Metadata } from "next";
import Image from "next/image";

import consts from "@/utils/consts";
import { getUserPosts } from "@/utils/api/user/posts";
import { getUserInfo } from "@/utils/api/user/info";
import { addLogoBadge } from "@/utils/server";
import { Section } from "@/components/Section";
import { ErrorPage } from "@/components/Pages";

import { CardList, ProfileInfo } from "./server";
import { DataBox, ProfileEditor } from "./client";
import styles from "./styles.module.scss";


interface UserPageProps {
  params: { username: string }
}

export async function generateMetadata({ params }:UserPageProps) : Promise<Metadata> {
  const username = params.username;
  const { data:profile } = await getUserInfo('username', params.username);

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

export default async function UserPage({ params }:UserPageProps) {
  const self = await getUserInfo('self');

  if (self.error)
    return (
      <ErrorPage
        message={self.error?.message}
        code={self.error?.code}
        type="PG"
      />
    );

  const isSelf  = self.data.username.toLowerCase() === params.username.toLowerCase();
  const user = isSelf ? self : await getUserInfo('username', params.username);
  const posts = user.data ? await getUserPosts('author_uuid', user.data.id) : null;

  if (user.error || !posts)
    return (
      <ErrorPage
        message={user.error?.message}
        code={user.error?.code}
        type="PG"
      />
    );

  if (posts.error)
    return (
      <ErrorPage
        message={posts.error?.message}
        code={posts.error?.code}
        type="PG"
      />
    );

  return (
    <Section className={styles.section} containerClassName={styles.sectionContainer}>
      <Image
        src={user.data.avatar}
        alt=''
        width={256}
        height={256}
        className={styles.avatarBlur}
      />
      <div className={styles.userBox}>
        { isSelf ? <ProfileEditor profile={self.data} /> : <ProfileInfo profile={user.data} /> }
        <DataBox cards={posts.data.length} joined={user.data.created_at} />
      </div>
      <hr/>
      <CardList posts={posts.data} />
    </Section>
  );
}
