"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { Button, C, Section } from "@/components";

import styles from "./styles.module.scss";
import { IoSearch, IoSearchCircleOutline } from "react-icons/io5";
import { Profile } from "@/supabase/actions/types";
import Image from "next/image";
import { humanizeTime } from "@/utils";
import { useHydration } from "@/hooks";
import Link from "next/link";


const setQuery = (value:string) => {
  const params = new URLSearchParams();
  params.set('q', value);
  return params.toString();
};

const Result = ({ user }:{ user:Profile; }) => {
  const hydrated = useHydration();
  return (
    <Link href={`/u/${user.username}`} id="wrapper">
      <Section containerClassName={styles.userContainer} isCard>
        <div className={styles.avatar}>
          <Image
            src={user.avatar}
            alt={`${user.display_name ?? user.username}'s avatar`}
            width={256}
            height={256}
          />
        </div>
        <div className={styles.sep} />
        <div className={styles.text}>
          <span>
            {user.display_name ?? user.username}
          </span>
          <span>
            <C.QUINARY>
              u:
            </C.QUINARY>
            <C.ACCENT>
              {user.username}
            </C.ACCENT>
            <C.QUINARY>
              {' • '}
            </C.QUINARY>
            <C.SECONDARY>
              {humanizeTime(user.created_at, !hydrated, true)}
            </C.SECONDARY>
          </span>
        </div>
      </Section>
    </Link>
  );
};

export function Searcher() {
  const path = usePathname();
  const initialQ = useSearchParams().get('q') ?? "";
  const [q, setQ] = useState<string>(initialQ);
  const [search, setSearch] = useState<string>(q);

  useEffect(() => {
    window.history.pushState(null, '', q.length ? `?${setQuery(q)}` : path);
  }, [q]);

  const onSubmit = () => {
    setQ(search);
  };

  return (
    <div className={styles.searcher}>
      <div className={styles.inputHolder}>
        <input
          type="text"
          placeholder="User or display name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSubmit={onSubmit}
          onKeyDown={e => { if (e.key === 'Enter') onSubmit(); }}
        />
        <Button
          icon={{ element: IoSearch }}
          className={styles.button}
          onClick={onSubmit}
          noMinimum
          iconBackground
        />
      </div>
      <div className={styles.resultsHolder}>
        {
          q.length ?
          <div className={styles.results}>
            <span>on that teehee</span>
          </div>
          :
          <div className={styles.hint}>
            <IoSearchCircleOutline />
            <span>
              Search users by username or display name
            </span>
          </div>
        }
      </div>
    </div>
  );
}
