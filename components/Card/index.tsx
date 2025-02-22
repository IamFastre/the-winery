import Image from "next/image";

import { Section } from "@/components/Section";
import { MarkDown } from "@/components/MarkDown";
import { UsernameHandle } from "@/components/UsernameHandle";
import { PostButtons } from "@/components/PostButtons";
import { HydratedTime } from "@/components/HydratedTime";

import { CornerButtons } from "./client";
import styles from "./style.module.scss";


export interface CardProps {
  title: string | null;
  content: string;
  timestamp?: number | string;
  className?: string;
  sectionClassName?: string;
  centered?: boolean;
  postId?: number;
  username?: string;
  userAvatar?: string;
};

export function Card(props:CardProps) {
  return (
    <div className={`${styles.card} ${props.className || ""}`}>
      <Section
        title={props.title}
        className={`${styles.section} ${props.sectionClassName || ""}`}
        containerClassName={styles.sectionContent}
        centered={props.centered || false}
        noFlex
        isCard
      >
        <MarkDown>{props.content}</MarkDown>
      </Section>

      <div className={styles.caption}>
        {props.userAvatar && (
          <Image
            src={props.userAvatar}
            alt={`${props.username}'s avatar`}
            width={32}
            height={32}
            priority
          />
        )}
        <div className={styles.text}>
          {props.username && <UsernameHandle id="user-post" username={props.username} />}
          {props.timestamp && (
            <div className={`${styles.date} ${props.username || props.postId ? "" : styles.noUser}`}>
              <HydratedTime timestamp={props.timestamp} />
            </div>
          )}
        </div>
        {props.postId && (
          <div className={styles.interactionsHolder}>
            <PostButtons postId={props.postId} postTitle={props.title} postContent={props.content} />
          </div>
        )}
      </div>
      {props.postId && <CornerButtons id={props.postId} postTitle={props.title} postContent={props.content} />}
    </div>
  );
}
