import { ReactNode } from "react";
import Link from "next/link";
import { GiBrokenBottle } from "react-icons/gi";
import { IoHomeOutline, IoReloadOutline, IoWarningOutline } from "react-icons/io5";

import { C, L, RI } from "@/components/C";
import { Section } from "@/components/Section";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

interface ErrorPageProps {
  message?: ReactNode;
  code?: string | number;
  type?: "JS" | "PG" | "WN";
  noFill?: boolean;
}

export function ErrorPage(props:ErrorPageProps) {
  return (
    <Section
      title="Error"
      titleColor={colors.red}
      style={props.noFill ? undefined : { flex: 1 }}
      containerClassName={styles.sectionContent}
      centered
    >
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
            href={`?date=${Date.now()}`}
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
    </Section>
  );
}