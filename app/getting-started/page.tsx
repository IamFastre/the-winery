"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoWine, IoWineOutline } from "react-icons/io5";

import { getLogo } from "@/utils";
import { B, Button, C, Header, RI, Section } from "@/components";

import styles from "./styles.module.scss";
import { getUser } from "@/utils/server";


const Nail = () => (
  <div style={{ fontSize: 26 }}>
    •
  </div>
);

export default function GettingStartedPage() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [hrtCls, setHrtCls] = useState<string>(styles.icon);

  const isBeating = () => hrtCls !== styles.icon;

  useEffect(() => {
    const start = async () => {
      const { data, error } = await getUser();

      if (data && !error)
        setUsername(data.username);
    };

    start();
  }, [])

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
    <div style={{ flex: 1 }}>
      <Header
        title="The Winery"
        left={<Nail />}
        right={<Nail />}
        margin="20px"
      />
      <Section style={{ flex: 1 }} containerClassName={styles.sectionContainer} centered>
        <div
          onClick={() => setClicks(c => c + 1)}
          className={hrtCls}
        >
          <Image
            src={getLogo("main")}
            alt="the Winery logo; a purple heart suit with a sharp spiky hexagram on top"
            className={styles.image}
            priority
          />
        </div>

        <h2 className={styles.hello}>Hello, there!</h2>
        <a href="https://youtu.be/rEq1Z0bjdwc" target="_blank" style={{ color: 'transparent', textDecoration: 'none' }}>
          General Kenobi!
        </a>

        <hr/>

        <div className={styles.desc}>
          <p>
            Welcome to <B title="Such a creative name, right?!"><C.ACCENT>The Winery</C.ACCENT></B> where,{' '}
            <span title="Kinda obvious">no sadly, we don't make wine</span>, but where we <span title="And other stuff too">whine!</span>
            <br/>
            <span title="Guess who doesn't care about your opinion? me!!">Close enough for me, I'll take it.</span>
          </p>

          <p>
            You can create and share pieces/posts (or as called here "cards") with others,
            the content of which is whatever pleases you and perhaps other since it's a <span title="☭">social platform.</span>
          </p>

          {
            username ?
              <p>
                Oh, you seem to be already logged in!
                Welcome back, <C.ACCENT>{username}</C.ACCENT>!
                <br/>
                No idea what brings you back here, but you're always welcome I guess, and we don't judge
                But aren't you like tired of repetition?
                You've been here once before it's kinda redundant...
                <br/>
                If you came back for the heart easter egg I don't blame you, well then, I don't blame you.
                You don't know what's that?! Dude... <RI><C.QUINARY>tsk tsk tsk</C.QUINARY></RI>.
              </p>
            :
              <p>
                To get started and ferment your own pieces, you can <a href="/login">log in</a> to your account.
                Oh you don't have one? <span title="I mean, of course...">expected</span>; you can also <a href="/signup">create a new account</a>!
                How fabulous!
              </p>
          }

          <p>
            {username ? "You" : "Then after that you"} can go ahead and compose some <RI><C.QUINARY>oeuvres d'art</C.QUINARY></RI>{username ? " though" : ""}:
          </p>
        </div>

        <Button
          title="Compose"
          icon={{
            element: isBeating() ? IoWine : IoWineOutline,
          }}
          onClick={() => router.push('/compose')}
          disabled={!username}
        />

        <span style={{ opacity: showMsg ? 1 : 0 }} className={styles.msg}>
          Wish {isBeating() ? "CPR" : "giving someone a cardiac arrest"} was that easy...
        </span>
      </Section>
    </div>
  );
}
