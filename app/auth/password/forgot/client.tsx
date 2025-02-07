"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { IoCheckmark } from "@icons/io5/IoCheckmark";

import consts from "@/utils/consts";
import { sendResetPassword } from "@/supabase/actions/user";
import { AuthError } from "@/supabase/actions/types";
import { useGoTo } from "@/hooks";
import { Button } from "@/components/Button";
import { C } from "@/components/C";
import { GoHomeLogo } from "@/components/GoHomeLogo";
import { LabelTitle } from "@/components/LabelTitle";
import { Section } from "@/components/Section";

import styles from "../../styles.module.scss";


const checkEmail = (str:string) : boolean => {
    if (!str)
      return true;

    return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i
           .test(str);
}

export function ForgotCard() {
  const [redirecting, goto] = useGoTo();

  const [email, setEmail] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const isOK = email && checkEmail(email);

  const onSubmit = async () => {
    if (isOK) {
      const { data, error } = await sendResetPassword(email);

      if (data === null)
        setError(error as AuthError);
      else
        setSuccess(true);
    }
  };

  return (
    <Section title="Password Reset" className={`${styles.section}`} containerClassName={styles.sectionContent} containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }} isCard centered>
      <GoHomeLogo
        goto={goto}
        redirecting={redirecting}
        className={styles.image}
      />
      <div className={styles.name}>
        <C.SECONDARY>
          {'•-{ '}
          <C.ACCENT>
            {consts.name}
          </C.ACCENT>
          {' }-•'}
        </C.SECONDARY>
      </div>

      { 
        success ?
        <>
          <div className={styles.success}>
            <p>
              An email with the reset password link was sent to your inbox!
            </p>
            <Button
              icon={{ element: IoCheckmark, size: 20 }}
              onClick={() => goto('/auth/login')}
              className={styles.successButton}
              noMinimum
            />
          </div>
        </>
        :
        <>
          <div className={styles.paragraph}>
            <p>
              <span title="First is virginity">
                Second worse thing to unintentionally lose is your password.
              </span>
              {' '}
              That's why we're here to recover it for you!
              {' '}
              You'll receive an email on the address of your account, so let's start here:
            </p>
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
                    onSubmit();
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

            <Button
              title="Send Link"
              onClick={onSubmit}
              disabled={!isOK}
              className={styles.button}
            />

            <Link href="/auth/login">
              Suddenly remembered?
            </Link>
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
        </>
      }
    </Section>
  );
}
