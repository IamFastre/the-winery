"use client";
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { Button, C, GoHomeLogo, Section } from "@/components";
import { useGoTo } from "@/hooks";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";


const checkEmail = (str:string) : boolean => {
    if (!str)
      return true;

    return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i
           .test(str);
}

const LabelTitle = ({ title }:{ title:string }) => {
  return (
    <span>
      <C.ACCENT>
        {'> '}
      </C.ACCENT>
      {title}
    </span>
  );
}

export default function LoginPage() {
  const [redirecting, goto] = useGoTo();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);
  const [invalidMail, setInvalidMail] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef  = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    console.log({ email, password })
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Section title="Bienvenue" className={`${styles.section}`} containerClassName={styles.sectionContent} containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }} isCard centered>
          <GoHomeLogo
            goto={goto}
            redirecting={redirecting}
            className={styles.image}
            style={{ filter: showPass ? "saturate(0) blur(3px)" : "" }}
          />
          <div className={styles.name}>
            <C.SECONDARY>
              {'•-{ '}
              <span style={{ color: showPass ? colors.quinary : colors.accent }}>
                The Winery
              </span>
              {' }-•'}
            </C.SECONDARY>
          </div>

          <div className={styles.form}>
            <label>
              <LabelTitle title="Email" />
              <input
                name="email"
                autoComplete="email"
                type="email"
                title=""
                value={email}
                placeholder="user@example.com"
                onChange={e => setEmail(e.target.value)}
                ref={emailRef}
                required
                onBlur={e => setInvalidMail(!checkEmail(email))}
                onKeyDown={e => {
                  if (e.key === 'Enter')
                    passRef.current?.focus();
                }}
              />
              { invalidMail ? <C.RED>{'> WRONG'}</C.RED> : null}
            </label>

            <label>
              <LabelTitle title="Password" />
              <div className={styles.passwordContainer}>
                <input
                  name="password"
                  autoComplete="new-password"
                  type={showPass ? "text" : "password"}
                  title=""
                  value={password}
                  placeholder="********"
                  onChange={e => setPassword(e.target.value)}
                  ref={passRef}
                  required
                />
                <div
                  title={showPass ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? <IoEyeOff id="closed" /> : <IoEye id="open" />}
                </div>
              </div>
            </label>

            <Button
              title="Log in"
              onClick={onSubmit}
            />

            <a href="">
              Forgot password?
            </a>
          </div>
        </Section>

        <Section isCard>
          <span className={styles.noAcc}>
            Don't have an account? <a href="/signup">sign up</a> now!
          </span>
        </Section>
      </div>
    </div>
  );
}
