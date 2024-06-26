"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IconBaseProps } from "react-icons";
import { IoCogOutline, IoInformationCircleOutline, IoPersonCircleOutline, IoWineOutline } from "react-icons/io5";

import { Section } from "@/components";

import NDC from "@/public/static/images/NaipeDeCopas.png";
import colors from '@/styles/colors.module.scss';
import styles from "./home.module.scss";



export default function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const router = useRouter();
  const [isRe, setIsRe] = useState<boolean>(false);

  const goto = (path:string) => {
    setIsRe(true);

    setTimeout(() => {
      router.push(path);
      setIsRe(false);
    }, 960)
  };

  const iconProps:IconBaseProps = {
    color: colors.quinary,
    size: 50
  }
  
  return (
    <div className={styles.body}>
      <div className={styles.bar}>
        <Section style={{ flex: 1 }} containerStyle={{ borderStyle: isRe ? 'dashed' : 'solid' }}>
          <div className={styles.nav}>
            <div className={`${styles.image} ${isRe ? styles.redirecting : ""}`} onClick={() => goto('/home')}>
              <Image
                src={NDC}
                alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
                priority
              />
              </div>
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