import { ReactNode } from "react";
import Link from "next/link";
import { GiBrokenBottle } from "@icons/gi/GiBrokenBottle";
import { IoHomeOutline } from "@icons/io5/IoHomeOutline";
import { IoReloadOutline } from "@icons/io5/IoReloadOutline";
import { IoWarningOutline } from "@icons/io5/IoWarningOutline";

import { C, L, RI } from "@/components/C";
import { Section } from "@/components/Section";

import colors from "@/styles/colors.js";
import styles from "./styles.module.scss";

interface ErrorPageProps {
  message?: ReactNode;
  code?: string | number;
  type?: "JS" | "PG" | "WN";
  noFill?: boolean;
  noCard?: boolean;
}

export function ErrorPage(props:ErrorPageProps) {
  const content = (
    <div>
      <GiBrokenBottle />
      <h1>
        Uh-oh...
      </h1>
      <p>
        <C.RED>
          <RI>
            An error has occurred.
          </RI>
        </C.RED>
        <br/>
        <C.QUINARY style={{ 'userSelect': 'text' }}>
          {
            props.message ??
            <>
              If you think this shouldn't happen,
              <br/>
              please report it at Github by clicking <IoWarningOutline />.
            </>
          }
        </C.QUINARY>
      </p>
      <div>
        <Link
          href={`https://github.com/IamFastre/the-winery/issues`}
          target="_blank"
          title="Report Error"
          type="wrapper"
        >
          <IoWarningOutline />
        </Link>
        <Link
          href={`?reload=${Math.floor(Math.random() * 1e12)}`}
          title="Reload Page"
          type="wrapper"
        >
          <IoReloadOutline />
        </Link>
        <Link
          href="/"
          title="Return Home"
          type="wrapper"
        >
          <IoHomeOutline />
        </Link>
      </div>
      {props.code !== undefined && (
        <p>
          <C.QUATERNARY>
            <L>
              ERROR CODE: {props.type}[<C.SECONDARY style={{ 'userSelect': 'text' }}>{props.code}</C.SECONDARY>]
            </L>
          </C.QUATERNARY>
        </p>
      )}
    </div>
  );

  if (props.noCard)
    return (
      <div className={styles.sectionContent}>
        {content}
      </div>
    );

  return (
    <Section
      title="Error"
      titleColor={colors.red}
      style={props.noFill ? undefined : { flex: 1 }}
      containerClassName={styles.sectionContent}
      centered
    >
      {content}
    </Section>
  );
}