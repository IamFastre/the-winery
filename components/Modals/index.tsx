"use client";
import { Fragment, MouseEventHandler } from "react";
import Link from "next/link";
import { IconType } from "@react-icons/all-files";
import { IoClose } from "@icons/io5/IoClose";

import { focusable } from "@/utils/client";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

import styles from "./style.module.scss";

export type Option = {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  icon?: IconType;
  action?: MouseEventHandler<HTMLDivElement>;
  href?: string;
  condition?: boolean;

  flColor?: string;
  bgColor?: string;
  
  skColor?: string;
  skWidth?: number | string;

  txSize?: number | string;
  txColor?: string;

  iconSide?: 'left' | 'right';
};

export interface MenuModalProps {
  title?: string;
  children?: React.ReactNode;
  close: MouseEventHandler<HTMLDivElement>;
  closeButton?: 'top' | 'bottom';
  alignTitle?: 'left' | 'center' | 'right';
}

export interface OptionsModalProps extends Omit<MenuModalProps, 'children'> {
  title?: string;
  options: Option[];
  close: MouseEventHandler<HTMLDivElement>; 
}

export function MenuModal(props:MenuModalProps) {
  return (
    <Section className={styles.menu} containerClassName={styles.menuContainer}>
      {
        (props.closeButton === 'top' || props.title) &&
        <>
          <div className={styles.header}>
            {
              props.closeButton === 'top' &&
              <div className={styles.smallCloseButton} {...focusable(styles.active, props.close)}>
                <IoClose />
              </div>
            }
            {props.title && <h4 style={{ textAlign: props.alignTitle }}>{props.title}</h4>}
          </div>
          <hr/>
        </>
      }
      {props.children}
      {
        (props.closeButton === 'bottom' || props.closeButton === undefined) &&
        <>
          <hr/>
          <Button
            title="Close"
            className={styles.bigCloseButton}
            onClick={props.close}
            noBrackets
          />
        </>
      }
    </Section>
  );
}

export function OptionsModal(props:OptionsModalProps) {
  return (
    <MenuModal title={props.title} close={props.close}>
      {props.options.map((o, i) => {
        if (o.condition === false)
          return null;

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
    </MenuModal>
  );
}
