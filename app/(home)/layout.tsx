"use client";
import { IconType } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoWineOutline } from "react-icons/io5";

import { Section, GoHomeLogo } from "@/components";
import { focusable } from "@/utils";
import { useGoTo } from "@/hooks";

import styles from "./layout.module.scss";


export default function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const [redirecting, goto] = useGoTo();

  const Icon = (props:{ icon:IconType; dest?:string; }) => {
    const onclick = props.dest ? () => goto(props.dest!) : undefined;

    return (
      <props.icon
        className={styles.icon}
        {...focusable(styles.active, onclick) as any}
      />
    );
  };

  return (
    <div className={styles.body}>
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
              <Icon icon={IoPersonCircleOutline} dest={'/profile'} />
              <Icon icon={IoWineOutline} />
              <Icon icon={IoCogOutline} />
              <Icon icon={IoInformationCircleOutline} dest={'/getting-started'} />
            </div>
          </div>
        </Section>
      </div>
      {children}
    </div>
  );
}
