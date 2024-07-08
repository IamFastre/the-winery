"use client";
import { IconType } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoSearchOutline, IoWineOutline } from "react-icons/io5";

import { Section, GoHomeLogo } from "@/components";
import { focusable } from "@/utils";
import { useGoTo } from "@/hooks";

import styles from "./layout.module.scss";


export default function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const [redirecting, goto, current] = useGoTo();

  const Icon = (props:{ icon:IconType; dest?:string; }) => {
    const onclick = props.dest ? () => goto(props.dest!) : undefined;

    return (
      <props.icon
        className={`${styles.icon} ${props.dest === current ? styles.current : ""}`}
        {...focusable(styles.active, onclick) as any}
      />
    );
  };

  return (
    <div className={styles.body}>
      {/* TODO: Resizable bar + icon title */}
      <div className={styles.bar}>
        <Section style={{ flex: 1 }} containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }}>
          <div className={styles.nav}>
            <GoHomeLogo
              redirecting={redirecting}
              goto={goto}
              className={styles.image}
            />
            <div className={styles.sep} />
            <div className={styles.icons}>
              <Icon icon={IoSearchOutline} />
              <Icon icon={IoPersonCircleOutline} dest='/profile' />
              <Icon icon={IoWineOutline} dest='/compose'/>
              <Icon icon={IoCogOutline} />
              <Icon icon={IoInformationCircleOutline} dest='/getting-started' />
            </div>
          </div>
        </Section>
      </div>
      {children}
    </div>
  );
}
