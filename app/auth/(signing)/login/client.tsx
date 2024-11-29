"use client";
import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "@icons/io5/IoCloseCircleOutline";
import { IoEye } from "@icons/io5/IoEye";
import { IoEyeOff } from "@icons/io5/IoEyeOff";
import { IoWarningOutline } from "@icons/io5/IoWarningOutline";

import consts from "@/utils/consts";
import { useToaster } from "@/providers/Toaster";
import { signIn } from "@/supabase/actions/user";
import { AuthError } from "@/supabase/actions/types";
import { Button, C, GoHomeLogo, LabelTitle, LoadingText, Section } from "@/components";
import { useGoTo } from "@/hooks";

import colors from "@/styles/colors.module.scss";
import styles from "../../styles.module.scss";


const checkEmail = (str:string) : boolean => {
    if (!str)
      return true;

    return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i
           .test(str);
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

export function LoginCard() {
  const toaster = useToaster();
  const [redirecting, goto] = useGoTo();

  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      const { data, error } = await signIn(email, password);

      if (error)
        setError(error);

      else if (data) {
        setError(null);
        goto('/', 'replace');
      }
      setLoading(false);
    }
  };

  return (
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
            {consts.name}
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
          {
            checkEmail(email) ||
              <div className={styles.badInput}>
                <span className={styles.bad}>
                  Invalid email address.
                </span>
              </div>
          }
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
              placeholder="************"
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
              onClick={e => { e.preventDefault(); setShowPass(p => !p)}}
            >
              {showPass ? <IoEyeOff id="closed" /> : <IoEye id="open" />}
            </div>
          </div>
          { passChecker && <PasswordChecker password={password} /> }
        </label>

        <Button
          title={loading ? <LoadingText text="Logging in" /> : "Log in"}
          onClick={onSubmit}
          disabled={!isOK || loading}
          className={styles.button}
        />

        <a href="/auth/password/forgot">
          Forgot password?
        </a>
      </form>
      {
        error &&
          <div className={styles.failure}>
            <span style={{ textAlign: 'center' }}>
              <IoCloseCircleOutline />
              {' '}
              <span>
                {error.message ?? "An error has occurred"}.
              </span>
            </span>
            <Button
              icon={{ element: IoWarningOutline, size: 20 }}
              onClick={() => toaster.add({ message: "In case of unexpected errors file a Github issue at IamFastre/the-winery", type: 'error', duration: 7500 })}
              className={styles.resultButton}
              color={colors.red}
              noMinimum
            />
          </div>
      }
    </Section>
  );
}
