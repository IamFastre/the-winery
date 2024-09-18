"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { IoCloseCircleOutline, IoSadOutline, IoSearch, IoSearchCircleOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

import { humanizeTime } from "@/utils";
import { Button, C, LoadingText, Section } from "@/components";
import { PublicProfile } from "@/supabase/actions/types";
import { searchProfiles } from "@/supabase/actions/user";
import { useHydration } from "@/hooks";

import styles from "./styles.module.scss";


const setQuery = (value:string) => {
  const params = new URLSearchParams();
  params.set('q', value);
  return params.toString();
};

const Result = ({ user }:{ user:PublicProfile; }) => {
  const hydrated = useHydration();
  return (
    <Link href={`/u/${user.username}`} type="wrapper">
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
  const [results, setResults] = useState<PublicProfile[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (q.length)
      onSubmit();
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', (q.length ? `?${setQuery(q)}` : path));
  }, [q]);

  const onSubmit = async () => {
    const query = search;
    setQ(query);
    setResults(null);

    const { data, error } = await searchProfiles(query);
    setResults(data);
    setError(!!error);
  };

  return (
    <div className={styles.searcher}>
      <div className={styles.inputHolder}>
        {/* TODO: Add an (x) to remove query button thing */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSubmit={e => { e.preventDefault(); onSubmit(); }}
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
            {
              error ?
              <div className={styles.error}>
                <IoCloseCircleOutline />
                <span>
                  Oops, an unexpected error has occurred
                </span>
              </div>
              : !results ?
                <div className={styles.loading}>
                  <LoadingText text="Searching" />
                </div>
              : results.length ?
                results.map(r => (
                  <Result user={r} key={r.username} />
                ))
              :
              <div className={styles.noResult}>
                <IoSadOutline />
                <span>
                  No such user was found
                </span>
              </div>
            }
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
