"use client";
import { Fragment, MouseEventHandler } from "react";
import Link from "next/link";
import { IconType } from "react-icons";

import { focusable } from "@/utils/client";
import { Button, Section } from "@/components";

import styles from "./style.module.scss";

export type Option = {
  title: string;
  subtitle?: string;
  icon?: IconType;
  action?: MouseEventHandler<HTMLDivElement>;
  href?: string;

  flColor?: string;
  bgColor?: string;

  skColor?: string;
  skWidth?: number | string;

  txSize?: number | string;
  txColor?: string;

  iconSide?: 'left' | 'right';
};

export interface OptionsModalProps {
  title?: string;
  options: Option[];
  close: MouseEventHandler<HTMLDivElement>; 
}

export function OptionsModal(props:OptionsModalProps) {
  return (
    <Section className={styles.menu} containerClassName={styles.menuContainer}>
      {props.title && <h3>{props.title}</h3>}
      {props.options.map((o, i) => {
        const icon = o.icon &&
          <o.icon
            className={o.skWidth ? styles.customStrokeWidth : undefined}
            style={{
              backgroundColor: o.bgColor,
              fill: o.flColor,
              stroke: o.skColor,
              strokeWidth: o.skWidth,
            }}
          />;

        const option = (
          <>
            {(!o.iconSide || o.iconSide === 'left') && icon}
            <div>
              <span className={styles.optionTitle} style={{ color: o.txColor, fontSize: o.txSize }}>
                {o.title}
              </span>
              {
                o.subtitle &&
                  <span className={styles.optionSubtitle}>
                    {o.subtitle}
                  </span>
              }
            </div>
            {o.iconSide === 'right' && icon}
          </>
        );

        return (
          <Fragment key={`${i}-${o.title}`}>
            {
              o.action ?
                <div className={styles.option} {...focusable(styles.active, o.action)}>
                  {option}
                </div>
              : o.href ?
                <Link className={styles.option} href={o.href} type="wrapper">
                  {option}
                </Link>
              :
                <div className={`${styles.option} ${styles.field}`}>
                  {option}
                </div>
            }
          </Fragment>
        );
      })}
      <hr/>
      <Button
        title="Close"
        className={styles.closeButton}
        onClick={props.close}
        noBrackets
      />
    </Section>
  );
}
