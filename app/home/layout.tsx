"use client";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoWineOutline } from "react-icons/io5";

import { Section, GoHomeLogo } from "@/components";
import { useGoTo } from "@/hooks";

import styles from "./home.module.scss";


export default function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const [redirecting, goto] = useGoTo();

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
              <IoPersonCircleOutline
                className={styles.icon}
              />
              <IoWineOutline
                className={styles.icon}
              />
              <IoCogOutline
                className={styles.icon}
              />
              <IoInformationCircleOutline
                className={styles.icon}
                onClick={() => goto('/getting-started')}
              />
            </div>
          </div>
        </Section>
      </div>
      {children}
    </div>
  );
}
