"use client";
import { Button, Section } from "@/components";
import styles from "./register.module.scss";
import { useRef, useState } from "react";
import { multiplyString } from "@/utils";

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
        <Section title="Register" className={styles.section} isCard centered>
          <form>

            <label>
              <span>
                Email
              </span>
              <input
                type="email"
                value={email}
                placeholder="user@email.com"
                onChange={e => setEmail(e.target.value)}
                ref={emailRef}
                required
                onKeyDown={e => {
                  if (e.key === 'Enter')
                    passRef.current?.focus();
                }}
              />
            </label>

            <label>
              <span>
                Password
              </span>
              <input
                type="password"
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
            </label>

            <label>
              <span>
                Confirm Password
              </span>
              <input
                type="password"
                value={confPass}
                placeholder={password ? multiplyString("*", password.length) : "********"}
                onChange={e => setConfPass(e.target.value)}
                ref={cPassRef}
                required
              />
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
