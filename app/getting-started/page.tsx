"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoWine } from "react-icons/io5";

import { B, Button, C, Section } from "@/components";

import NDC from "@/public/static/images/NaipeDeCopas.png";
import styles from "./getting-started.module.scss";


export default function GettingStarted() {
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
    <Section style={{ flex: 1 }} centered>
      <div className={styles.holder}>
        <div
          onClick={() => setClicks(c => c + 1)}
          className={hrtCls}
        >
          <Image
            src={NDC}
            alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
            className={styles.image}
            priority
          />
        </div>
        <span className={styles.text}>
          Hello, there!
          <br/>
          <a href="https://youtu.be/rEq1Z0bjdwc" target="_blank" style={{ textDecoration: 'none' }}>
            <C.NONE>
                General Kenobi!
            </C.NONE>
          </a>
        </span>

        <div className={styles.sep} />

        <span className={styles.desc}>
          Welcome to <C.ACCENT><B>The Winery</B></C.ACCENT> where, no sadly, we don't make wine, but where we whine!
          <br/>
          To get start and ferment your own pieces, please <a href="">log in</a> to your account.
          <br/>
          Oh you're new? expected; <a href="">create new account</a>!
        </span>

        <Button
          title="Get started"
          icon={{
            element: IoWine,
          }}
          onClick={() => alert("Still working on that :)")}
        />

        <span style={{ opacity: showMsg ? 1 : 0 }} className={styles.msg}>
          Wish {isBeating() ? "CPR" : "giving someone a cardiac arrest"} was that easy...
        </span>
      </div>
    </Section>
  );
}
