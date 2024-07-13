import Image from "next/image";

import { C, MarkDown, Section } from "@/components";

import styles from "./style.module.scss";
import { humanizeTime } from "@/utils";


export interface CardProps {
  username: string;
  userAvatar: string;
  title: string;
  content: string;
  timestamp: number;
  className?:string;
}

export function Card(props:CardProps) {
  return (
    <div className={`${styles.card} ${props.className}`}>
      <Section title={props.title} className={styles.section} containerClassName={styles.sectionContent} noFlex isCard>
        <MarkDown>
          {props.content}
        </MarkDown>
      </Section>

      <div className={styles.caption}>
        <Image
          src={props.userAvatar}
          alt={`${props.username}'s avatar`}
          width={25}
          height={25}
          priority
        />
        <span className={styles.author}>
          <C.QUINARY>
            u:
          </C.QUINARY>
          <C.ACCENT>
            {props.username}
          </C.ACCENT>
        </span>
      </div>
      <div className={styles.date}>
        <span>
          {humanizeTime(props.timestamp)}
          {/* today at 10:19pm */}
        </span>
      </div>
    </div>
  );
}
