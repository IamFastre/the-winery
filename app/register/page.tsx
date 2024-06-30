"use client";
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { Button, C, GoHomeLogo, Section } from "@/components";
import { multiplyString } from "@/utils";

import colors from '@/styles/colors.module.scss';
import styles from "./register.module.scss";

const checkEmail = (str:string) : boolean => {
    if (!str)
      return true;

    return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i.test(str);
}

const checkPassword = (str:string) : boolean => {
  if (!str)
    return true;

  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%^&()\.\,\-\+\*\/=\\]).{1,}$/.test(str);
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

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPass, setConfPass] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef  = useRef<HTMLInputElement>(null);
  const cPassRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    console.log({ email, password })
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* TODO: Make redirecting make this dashy */}
        <Section title="Register" className={`${styles.section}`} isCard centered>
          <GoHomeLogo
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
          <form>
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
                onKeyDown={e => {
                  if (e.key === 'Enter')
                    passRef.current?.focus();
                }}
              />
              { checkEmail(email) ? "" : <C.RED>{'> WRONG'}</C.RED>}
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
                  onKeyDown={e => {
                    if (e.key === 'Enter')
                      cPassRef.current?.focus();
                  }}
                />
                <div
                  title={showPass ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? <IoEyeOff id="closed" /> : <IoEye id="open" />}
                </div>
              </div>
              { checkPassword(password) ? "" : <C.RED>{'> WRONG'}</C.RED>}
            </label>

            <label>
              <LabelTitle title="Confirm Password" />
              <input
                name="password"
                autoComplete="new-password"
                type={showPass ? "text" : "password"}
                title=""
                value={confPass}
                placeholder={password ? multiplyString("*", password.length) : "********"}
                onChange={e => setConfPass(e.target.value)}
                ref={cPassRef}
                required
              />
              { password.length > 0 && confPass.length > 0 && password != confPass ? <C.RED>{'> WRONG'}</C.RED> : ""}
            </label>

            <Button
              title="Sign Up"
              onClick={onSubmit}
            />
          </form>
        </Section>

        <Section isCard>
          <span className={styles.haveAcc}>
            Already have an account? <a href="">log in</a> now!
          </span>
        </Section>
      </div>
    </div>
  );
}
