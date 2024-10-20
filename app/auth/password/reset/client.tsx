"use client";
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import consts from "@/utils/consts";
import { multiplyString } from "@/utils";
import { resetPassword } from "@/supabase/actions/user";
import { AuthError } from "@/supabase/actions/types";
import { Button, C, GoHomeLogo, LabelTitle, Section } from "@/components";
import { useGoTo } from "@/hooks";

import colors from '@/styles/colors.module.scss';
import styles from "../../styles.module.scss";
import { useToaster } from "@/providers/Toaster";

const checkPassword = (str:string) : boolean => {
  if (!str)
    return true;

  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/
         .test(str);
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

export function ResetCard() {
  const toaster = useToaster();
  const [redirecting, goto] = useGoTo();

  const [password, setPassword] = useState<string>('');
  const [confPass, setConfPass] = useState<string>('');

  const [showPass, setShowPass] = useState<boolean>(false);
  const [passChecker, setPassChecker] = useState<boolean>(false);
  const [cPassChecker, setCPassChecker] = useState<boolean>(false);

  const passRef  = useRef<HTMLInputElement>(null);
  const cPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<AuthError | null>(null);

  const isOK = password.length > 7
            && checkPassword(password)
            && password === confPass;

  const onSubmit = async () => {
    if (isOK) {
      const { data, error } = await resetPassword(password);

      if (error)
        setError(error);

      else if (data) {
        setError(null);
        toaster.add({ message: "Password reset successfully", type: "success" })
        goto(`/`);
      }
    }
  };

  return (
    <Section title="Password Reset" className={`${styles.section}`} containerClassName={styles.sectionContent} containerStyle={{ borderStyle: redirecting ? 'dashed' : 'solid' }} isCard centered>
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
          <LabelTitle title="Password" />
          <div className={styles.passwordContainer}>
            <input
              name="password"
              autoComplete="new-password"
              spellCheck={false}
              type={showPass ? "text" : "password"}
              title=""
              value={password}
              placeholder="********"
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
              onClick={() => setShowPass(p => !p)}
            >
              {showPass ? <IoEyeOff id="closed" /> : <IoEye id="open" />}
            </div>
          </div>
          { passChecker ? <PasswordChecker password={password} /> : null }
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
            placeholder={password ? multiplyString("*", password.length) : "********"}
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
          { cPassChecker ?
            <div className={styles.badInput}>
              <span className={password.length > 0 && password === confPass ? styles.good : styles.bad}>
                { password.length === 0 || !checkPassword(password)
                ? "Enter a valid password first."
                : "Matches password."}
              </span>
            </div>
            : null }
        </label>

        <Button
          title="Reset Password"
          onClick={onSubmit}
          disabled={!isOK}
          className={styles.button}
        />
      </form>
      {
        error ?
        <span className={styles.error}>
          <C.RED>
            {error.message ?? "An error has occurred"}
            <C.SECONDARY>[{error.status}]</C.SECONDARY>
          </C.RED>
        </span>
        : null
      }
    </Section>
  );
}
