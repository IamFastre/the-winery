"use client";
import { MouseEventHandler } from "react";
import Image from "next/image";

import { capitalize } from "@/utils";
import { focusable, SetState } from "@/utils/client";
import { signGoogle } from "@/supabase/actions/user";
import { AuthError } from "@/supabase/actions/types";

import styles from "../styles.module.scss";

interface ProvidersTrayProps {
  goto: (s:string) => void;
  setLoading: SetState<boolean>;
  setError: SetState<AuthError | null>;
}

const Provider = (props:{ name:string; onClick?:MouseEventHandler<HTMLElement>; disabled?:boolean; }) => {
  const name = props.name.toLowerCase();
  return (
    <div
      className={`${styles[name]} ${props.disabled ? styles.disabled : ''}`}
      {...focusable(styles.active, props.disabled ? undefined : props.onClick)}
    >
      <Image
        src={`/static/images/auth/${name}.svg`}
        alt={`${capitalize(name)} Logo`}
        width={25}
        height={25}
        draggable={false}
      />
    </div>
  );
}

export function ProvidersTray({ goto, setLoading, setError }:ProvidersTrayProps) {  
  const onSubmitGoogle = async () => {
    setLoading(true);
    const { data, error } = await signGoogle();

    if (error)
      setError(error);

    else if (data.url) {
      setError(null);
      goto(data.url);
    }

    setLoading(false);
  };

  return (
    <div className={styles.providersTray}>
      <Provider name="google" onClick={onSubmitGoogle} />
      <Provider name="apple" disabled />
      <Provider name="github" disabled />
      <Provider name="discord" disabled />
      <Provider name="twitch" disabled />
  </div>
  );
}
