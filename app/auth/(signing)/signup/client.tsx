"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { IoCheckmark } from "@icons/io5/IoCheckmark";
import { IoCloseCircleOutline } from "@icons/io5/IoCloseCircleOutline";
import { IoEye } from "@icons/io5/IoEye";
import { IoEyeOff } from "@icons/io5/IoEyeOff";
import { IoWarningOutline } from "@icons/io5/IoWarningOutline";

import consts from "@/utils/consts";
import { multiplyString } from "@/utils";
import { useToaster } from "@/providers/Toaster";
import { signUp } from "@/supabase/actions/user";
import { AuthError } from "@/supabase/actions/types";
import { useGoTo } from "@/hooks";
import { Button } from "@/components/Button";
import { C, RI } from "@/components/C";
import { GoHomeLogo } from "@/components/GoHomeLogo";
import { LabelTitle } from "@/components/LabelTitle";
import { LoadingText } from "@/components/LoadingText";
import { Section } from "@/components/Section";

import colors from "@/styles/colors";
import styles from "../../styles.module.scss";


const checkUsername = (str:string) : boolean => {
  if (!str)
    return true;

  return /^(?![0-9\-])[a-z0-9_-]+[^-]$/i
         .test(str);
};

const checkEmail = (str:string) : boolean => {
    if (!str)
      return true;

    return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i
           .test(str);
};

const checkPassword = (str:string) : boolean => {
  if (!str)
    return true;

  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/
         .test(str);
};

const UsernameChecker = ({ username }:{ username:string; }) => {
  return (
    <div className={styles.badInput}>
      <span className={/^[0-9a-zA-Z_\-]+$/.test(username) ? styles.good : styles.bad}>
        Allowed characters:
        <br/>
        {'- '}
        <C.SECONDARY>0-9, a-z, - and _</C.SECONDARY>
      </span>
      <span className={username.length > 2 ? styles.good : styles.bad}>
        Has 3 or more characters.
      </span>
      <span className={/^[0-9]/i.test(username) ? styles.bad : styles.good}>
        Cannot start with numbers.
      </span>
      <span className={/^[\-]/i.test(username) || /[\-]$/i.test(username) ? styles.bad : styles.good}>
        Cannot start or end with -.
      </span>
    </div>
  );
};

const PasswordChecker = ({ password }:{ password:string; }) => {
  const barRatio = password.length >= 8 ? 1 : password.length / 8;
  const color = barRatio === 1 ? colors.green : barRatio <= 0.25 ? colors.red : colors.yellow;

  return (
    <div className={styles.badInput}>
      <span className={barRatio === 1 ? styles.good : styles.bad}>
        Has 8 or more characters.
        <div>
          <div style={{ backgroundColor: color, transform: `scaleX(${barRatio})` }} />
        </div>
      </span>

      <span className={/[0-9]/.test(password) ? styles.good : styles.bad}>
        Contains one or more numbers.
      </span>

      <span className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? styles.good : styles.bad}>
        Contains lower and upper case letters.
      </span>

      <span className={/[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]/.test(password) ? styles.good : styles.bad}>
        Contains a special character:
        <br/>
        {'- '}
        <C.SECONDARY>{'?!@#$%~^&()[]{}.,-+*/=\\'}</C.SECONDARY>
      </span>
    </div>
  );
};

export function SignupCard() {
  const toaster = useToaster();
  const [redirecting, goto] = useGoTo();

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPass, setConfPass] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);
  const [nameChecker, setNameChecker] = useState<boolean>(false);
  const [passChecker, setPassChecker] = useState<boolean>(false);
  const [cPassChecker, setCPassChecker] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef  = useRef<HTMLInputElement>(null);
  const cPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<AuthError | null>(null);

  const isOK = username.length > 2
            && email
            && password.length > 7
            && checkUsername(username)
            && checkEmail(email)
            && checkPassword(password)
            && password === confPass;

  const onSubmit = async () => {
    if (isOK) {
      setLoading(true);
      const { data, error } = await signUp(username, email, password);

      if (error)
        setError(error);
      else if (data) {
        setError(null);
        setSuccess(true);
        setShowPass(false);
      }
      setLoading(false);
    }
  };

  return (
    <Section
      title={success ? "Success!" : "Create Account"}
      className={`${styles.section}`}
      containerClassName={styles.sectionContent}
      containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }}
      isCard
      centered
    >
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

      {
        success ?
        <div className={styles.success}>
          <h3>
            Great, {username}!
          </h3>
          <p>
            A confirmation email was sent to you at
            {' '}
            '<RI><C.TERTIARY>{email}</C.TERTIARY></RI>'.
            Now all you have to do is check your inbox!
          </p>
          <p style={{ fontSize: 'smaller' }}>
            If you're not signed in automatically just go to the <Link href="/auth/login"><C.TERTIARY>login page</C.TERTIARY></Link>.
          </p>
          <Button
            icon={{ element: IoCheckmark, size: 20 }}
            onClick={() => goto('/')}
            className={styles.resultButton}
            noMinimum
          />
        </div>
        :
        <form>
          <label>
            <LabelTitle title="Username" subtitle={username.includes("69") ? "nice" : undefined} />
            <input
              name="username"
              autoComplete="username"
              spellCheck={false}
              type="text"
              title=""
              value={username}
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
              required
              onFocus={() => setNameChecker(true)}
              onBlur={() => setNameChecker(!checkUsername(username) || username.length < 3)}
              onKeyDown={e => {
                if (e.key === 'Enter')
                  emailRef.current?.focus();
              }}
            />
            { nameChecker && <UsernameChecker username={username} /> }
          </label>

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
                autoComplete="new-password"
                spellCheck={false}
                type={showPass ? "text" : "password"}
                title=""
                value={password}
                placeholder="************"
                onChange={e => setPassword(e.target.value)}
                ref={passRef}
                required
                onFocus={() => setPassChecker(true)}
                onBlur={() => setPassChecker(!checkPassword(password))}
                onKeyDown={e => {
                  if (e.key === 'Enter')
                    cPassRef.current?.focus();
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

          <label>
            <LabelTitle title="Confirm Password" />
            <input
              name="password"
              autoComplete="new-password"
              spellCheck={false}
              type={showPass ? "text" : "password"}
              title=""
              value={confPass}
              placeholder={password ? multiplyString("*", password.length) : "************"}
              onChange={e => setConfPass(e.target.value)}
              ref={cPassRef}
              required
              onFocus={() => setCPassChecker(true)}
              onBlur={() => setCPassChecker(password.length > 0 && confPass.length > 0 && password !== confPass)}
              onKeyDown={e => {
                if (e.key === 'Enter' && isOK)
                  onSubmit();
              }}
            />
            {
              cPassChecker &&
                <div className={styles.badInput}>
                  <span className={password.length > 0 && password === confPass ? styles.good : styles.bad}>
                    { password.length === 0 || !checkPassword(password)
                    ? "Enter a valid password first."
                    : "Matches password."}
                  </span>
                </div>
            }
          </label>

          <Button
            title={loading ? <LoadingText text="Signing up"/> : "Sign up"}
            onClick={onSubmit}
            disabled={!isOK || loading}
            className={styles.button}
          />
        </form>
      }
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
