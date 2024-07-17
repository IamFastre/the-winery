"use client";
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { AuthError, signIn } from "@/utils/server";
import { Button, C, GoHomeLogo, Section } from "@/components";
import { useGoTo } from "@/hooks";

import colors from '@/styles/colors.module.scss';
import styles from "../styles.module.scss";


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

const PasswordChecker = ({ password }:{ password:string; }) => {
  return (
    <div className={styles.badInput}>
      <span className={password.length > 8 ? styles.good : styles.bad}>
        Too short.
      </span>
    </div>
  );
};

export default function LoginPage() {
  const [redirecting, goto] = useGoTo();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);
  const [passChecker, setPassChecker] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef  = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<AuthError | null>(null);

  const isOK = email
            && password.length > 7
            && checkEmail(email);

  const onSubmit = async () => {
    if (isOK) {
      const { data, error } = await signIn(email, password);

      if (error)
        setError(error);

      else if (data) {
        setError(null);
        goto('/', 'replace');
      }
    }
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

          <form>
            <label>
              <LabelTitle title="Email" />
              <input
                name="email"
                autoComplete="email"
                spellCheck={false}
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
              { !checkEmail(email) ?
                  <div className={styles.badInput}>
                    <span className={styles.bad}>
                      Invalid email address.
                    </span>
                  </div>
              : null }
            </label>

            <label>
              <LabelTitle title="Password" />
              <div className={styles.passwordContainer}>
                <input
                  name="password"
                  autoComplete="password"
                  spellCheck={false}
                  type={showPass ? "text" : "password"}
                  title=""
                  value={password}
                  placeholder="********"
                  onChange={e => setPassword(e.target.value)}
                  ref={passRef}
                  required
                  onFocus={() => setPassChecker(true)}
                  onBlur={() => setPassChecker(password.length <= 8)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && isOK)
                      onSubmit();
                  }}
                />
                <div
                  title={showPass ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? <IoEyeOff id="closed" /> : <IoEye id="open" />}
                </div>
              </div>
              { passChecker ? <PasswordChecker password={password} /> : null }
            </label>

            <Button
              title="Log in"
              onClick={onSubmit}
              disabled={!isOK}
              className={styles.button}
            />

            <a href="">
              Forgot password?
            </a>
          </form>
          {
            error ?
            <span className={styles.error}>
              <C.RED>
                {error.message ?? "An error has occurred"}
                <C.SECONDARY> [{error.status}]</C.SECONDARY>
              </C.RED>
            </span>
            : null
          }
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
