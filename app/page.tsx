"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Header, Section } from "@/components";
import styles from "/styles/page.module.scss";

const Nail = () => (
  <div style={{ fontSize: 26 }}>
    •
  </div>
);

export default function Home() {
  const imgSize:number = 200;
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [hrtCls, setHrtCls] = useState<string>(styles.icon);

  const isBeating = () => hrtCls !== styles.icon;

  useEffect(() => {
    if (clicks) {
      setTimeout(() => {
        setClicks(0);
      }, 1500);
    }

    if (clicks >= 3) {
      setShowMsg(true);
      setClicks(0);
      setHrtCls(isBeating() ? styles.icon : `${hrtCls} ${styles.beating}`);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
    }
    }, [clicks])

  return (
    <div style={{ flex: 1, margin: "10px" }}>
      <Header
        title="The Winery"
        left={<Nail />}
        right={<Nail />}
        margin="17px"
      />

      <Section style={{ flex: 1 }} centered>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: "15px" }}>
          <div
            onClick={() => setClicks(c => c + 1)}
            className={hrtCls}
          >
            <Image
              src={'/static/images/NaipeDeCopas.png'}
              alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
              width={imgSize}
              height={imgSize}
              priority
            />
          </div>
          <span>
            Hello, there!
            <br/>
            <a className="color-primary" href="https://youtu.be/rEq1Z0bjdwc" target="_blank">
              General Kenobi!
            </a>
          </span>
          <span style={{ opacity: showMsg ? 1 : 0 }} className={styles.msg}>
            Wish {isBeating() ? "CPR" : "giving someone a cardiac arrest"} was that easy...
          </span>
        </div>
      </Section>
    </div>
  );
}
