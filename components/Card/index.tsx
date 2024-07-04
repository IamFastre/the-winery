import Image from "next/image";
import MarkDown from "react-markdown";
import gfm from "remark-gfm";

import { C, Section } from "@/components";

import styles from "./style.module.scss";

export interface CardProps {
  username: string;
  userAvatar: string;
  title: string;
  content: string;
  className?:string;
}

export function Card(props:CardProps) {
  return (
    <div className={`${styles.card} ${props.className}`}>
      <Section title={props.title} className={styles.section} containerClassName={styles.sectionContent} noFlex isCard>
        {/* TODO: tables */}
        <MarkDown remarkPlugins={[gfm]}>
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
          today at 10:19pm
        </span>
      </div>
    </div>
  );
}
