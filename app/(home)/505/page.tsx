import { Metadata } from "next";
import Link from "next/link";
import { IoBug, IoClose } from "react-icons/io5";

import consts from "@/utils/consts";
import { B, C } from "@/components/C";
import { Section } from "@/components/Section";

import styles from "./styles.module.scss";

export const metadata:Metadata = {
  title: `505 • ${consts.name}`,
  description: "A song was found.",
}

export default function E505() {
  return (
    <Section
      style={{ flex: 1 }}
      containerClassName={styles.sectionContent}
    >
      <div className={styles.box}>
        <div className={styles.text}>
          <Link className={styles.closeButton} href="/" type="wrapper">
            <IoClose />
          </Link>
          <h2>
            <IoBug />
            Uh-oh?
          </h2>
          <C.RED>
            Error 505: <C.SECONDARY><B>Song found instead!</B></C.SECONDARY>
          </C.RED>
        </div>
        <div
          className={styles.iframeHolder}
          dangerouslySetInnerHTML={{ __html: `
            <iframe
              width="500"
              height="232"
              style="border-radius:12px"
              src="https://open.spotify.com/embed/track/0BxE4FqsDD1Ot4YuBXwAPp?utm_source=generator&theme=0"
              frameBorder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          `}}
        />
      </div>
    </Section>
  );
}
