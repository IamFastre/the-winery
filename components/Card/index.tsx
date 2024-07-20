import Image from "next/image";

import { Section } from "@/components/Section";
import { MarkDown } from "@/components/MarkDown";
import { C } from "@/components/C";

import { Time } from "./client";
import styles from "./style.module.scss";


export type CardProps = {
  title: string;
  content: string;
  timestamp?: number | string;
  className?:string;
  centered?:boolean;
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
      <Section title={props.title} className={styles.section} containerClassName={styles.sectionContent} noFlex isCard centered={props.centered}>
        <MarkDown>
          {props.content}
        </MarkDown>
      </Section>

      {
        props.username ?
          <div className={styles.caption}>
            <Image
              src={props.userAvatar}
              alt={`${props.username}'s avatar`}
              width={25}
              height={25}
              priority
            />
            <div className={styles.author}>
              <span>
                <C.QUINARY>
                  u:
                </C.QUINARY>
                <C.ACCENT>
                  <a href={`/u/${props.username}`}>
                    {props.username}
                  </a>
                </C.ACCENT>
              </span>
            </div>
          </div>
        : null
      }
      {
        props.timestamp ?
        <div className={`${styles.date} ${props.username ? styles.hasUser : ""}`}>
          <Time timestamp={props.timestamp} />
        </div>
      : null
      }
    </div>
  );
}
