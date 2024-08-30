import Image from "next/image";

import { Section } from "@/components/Section";
import { MarkDown } from "@/components/MarkDown";
import { UsernameHandle } from "@/components/UsernameHandle";
import { PostButtons } from "@/components/PostButtons";

import { Time } from "./client";
import styles from "./style.module.scss";


export type CardProps = {
  title: string | null;
  content: string;
  timestamp?: number | string;
  className?:string;
  sectionClassName?:string;
  sectionContainerClassName?:string;
  centered?:boolean;
  postId?:number;
} & ({
  username: string;
  userAvatar: string;
} | {
  username?: undefined;
  userAvatar?: undefined;
})

export function Card(props:CardProps) {
  return (
    <div className={`${styles.card} ${props.className}`}>
      <Section
        title={props.title}
        className={`${styles.section} ${props.sectionClassName}`}
        containerClassName={`${styles.sectionContent} ${props.sectionContainerClassName}`}
        centered={props.centered}
        noFlex
        isCard
      >
        <MarkDown>
          {props.content}
        </MarkDown>
      </Section>

      <div className={styles.caption}>
        {
          props.userAvatar ?
          <Image
            src={props.userAvatar}
            alt={`${props.username}'s avatar`}
            width={32}
            height={32}
            priority
          />
          : null
        }
        <div className={styles.text}>
          {
            props.username &&
              <UsernameHandle username={props.username} />
          }
          {
            props.timestamp ?
            <div className={`${styles.date} ${props.username || props.postId ? "" : styles.noUser}`}>
              <Time timestamp={props.timestamp} />
            </div>
            : null
          }
        </div>
        {
          props.postId &&
            <div className={styles.interactionsHolder}>
              <div>
                <PostButtons postId={props.postId} />
              </div>
            </div>
        }
      </div>
    </div>
  );
}
