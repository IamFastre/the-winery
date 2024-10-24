"use client";
import { ChangeEventHandler, Fragment, MouseEventHandler, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { GoPencil, GoTrash } from "react-icons/go";
import { IoBookmarkOutline, IoBuildOutline, IoCloseOutline, IoEllipsisHorizontalOutline, IoFolderOutline, IoSaveOutline } from "react-icons/io5";

import { humanizeTime } from "@/utils";
import { cropAvatar, focusable } from "@/utils/client";
import { B, Bio, Button, C, LabelTitle, Section } from "@/components";
import { Modal } from "@/providers/ModalProvider";
import { editAvatar, editProfile } from "@/supabase/actions/user";
import { Tables } from "@/supabase/types";
import { useHydration } from "@/hooks";

import colors from '@/styles/colors.module.scss';
import styles from "./styles.module.scss";

type Option = { title:string; icon?: IconType; action?:MouseEventHandler<HTMLDivElement>; href?:string; };

function ProfileOptions({ options, close }:{ options:Option[]; close: MouseEventHandler<HTMLDivElement>; }) {
  return (
    <Section className={styles.menu} containerClassName={styles.menuContainer}>
      {options.map((o, i) => (
        <Fragment key={`${i}-${o.title}`}>
          {
            o.action ?
              <div className={styles.option} onClick={o.action}>
                { o.icon ? <o.icon /> : null }
                <div>
                  <span>{o.title}</span>
                </div>
              </div>
            : o.href ?
              <Link className={styles.option} href={o.href} type="wrapper">
                { o.icon ? <o.icon /> : null }
                <div>
                  <span>{o.title}</span>
                </div>
              </Link>
            : null
          }
        </Fragment>
      ))}
      <hr/>
      <Button
        title="Close"
        className={styles.closeButton}
        onClick={close}
        noBrackets
      />
    </Section>
  );
}

export function ProfileEditor({ profile }:{ profile:Tables<'profiles'> }) {
  const router = useRouter();

  const [editing, setEditing] = useState<boolean>(false);
  const showOptionsState = useState<boolean>(false);
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>(profile.display_name ?? profile.username);
  const [bio, setBio] = useState<string>(profile.bio);

  const changed = !!avatarData || (profile.display_name ?? "") !== displayName || profile.bio !== bio;
  const imgInputRef = useRef<HTMLInputElement>(null);

  const openMenu = () => {
    showOptionsState[1](true);
  }

  const closeMenu = () => {
    showOptionsState[1](false);
  }

  const cancel = () => {
    setEditing(false);
    setAvatarData(null);
    setDisplayName(profile.display_name ?? profile.username);
    setBio(profile.bio);
  }

  const onSubmitImage:ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file)
      return;

    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => {
      cropAvatar(reader.result as string, s => {
        setAvatarData(s);
      });
    };
  };

  const handleEditButton = async () => {
    if (editing) {
      if (avatarData)
        await editAvatar(avatarData);

      if ((profile.display_name ?? "") !== displayName || profile.bio !== bio)
        await editProfile({ display_name: displayName, bio });

      if (changed) {
        cancel();
        router.refresh();
      }
    } else {
      setEditing(true);
    }
  };

  return (
    <>
      <div className={`${styles.avatar} ${editing ? styles.editing : ""}`}>
        <Image
          alt={`${profile.username}'s profile picture.`}
          src={editing ? avatarData ?? profile.avatar : profile.avatar}
          width={128}
          height={128}
        />
        {
          editing ?
          <div className={styles.avatarEdit} {...focusable(styles.active, () => imgInputRef.current?.click())}>
            <div className={styles.avatarEditIcon}>
              <GoPencil />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={onSubmitImage}
              ref={imgInputRef}
            />
          </div>
          : null
        }
        {
          editing && avatarData ?
          <div className={styles.avatarRemoveIcon} {...focusable("", () => setAvatarData(null))}>
            <GoTrash />
          </div>
          : null
        }
      </div>
      {
        editing ?
        <div className={styles.form}>
          <label>
            <LabelTitle title="Display name"/>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              onBlur={() => setDisplayName(d => d.trim())}
              name="username"
              autoComplete="off"
              spellCheck={false}
              type="text"
              placeholder={(profile.display_name ?? profile.username) + ` (max. 32)`}
              maxLength={32}
            />
            <div className={styles.maxLength}>
              <C.SECONDARY>
                { displayName.length === 32 ?
                  <C.RED>{displayName.length}</C.RED> :
                  <C.ACCENT>{displayName.length}</C.ACCENT> }
                /32
              </C.SECONDARY>
            </div>
          </label>
          <label>
            <LabelTitle title="About me"/>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              onBlur={() => setBio(b => b.trim())}
              name="description"
              autoComplete="off"
              placeholder={profile.bio + ` (max. 256)`}
              maxLength={256}
            />
            <div className={styles.maxLength}>
              <C.SECONDARY>
                { bio.length === 256 ?
                  <C.RED>{bio.length}</C.RED> :
                  <C.ACCENT>{bio.length}</C.ACCENT> }
                /256
              </C.SECONDARY>
            </div>
          </label>
        </div>
        :
        <div className={styles.textStuff}>
          <div className={styles.names}>
            <span>
              {profile.display_name ?? profile.username}
            </span>
            <span>
              <C.QUINARY>
                u:
              </C.QUINARY>
              <C.ACCENT>
                {profile.username}
              </C.ACCENT>
            </span>
          </div>
          <Bio content={profile.bio} />
        </div>
      }
      <div className={styles.buttonRack}>
        <Button
          title={editing ? "Save Changes" : "Edit Profile"}
          icon={{ element: editing ? IoSaveOutline : IoBuildOutline }}
          className={styles.button}
          onClick={handleEditButton}
          disabled={editing && !changed}
          noBrackets
          noMinimum
        />
        <Button
          icon={{ element: editing ? IoCloseOutline : IoEllipsisHorizontalOutline }}
          className={`${styles.button} ${styles.bigIcon}`}
          color={editing ? colors.red : colors.accent}
          onClick={editing ? cancel : openMenu}
          iconBackground
          noMinimum
        />
      </div>

      <Modal state={showOptionsState}>
        <ProfileOptions
          close={closeMenu}
          options={[
            { title: "Saved", icon: IoBookmarkOutline, href: '/saved' },
            { title: "Drafts", icon: IoFolderOutline, href: '/drafts' },
          ]}
        />
      </Modal>
    </>
  );
}

interface DataBoxProps {
  cards: number;
  joined: number | string;
}

export function DataBox({ cards, joined }:DataBoxProps) {
  const hydrated = useHydration();
  return (
    <div className={styles.dataBox}>
      <div className={styles.data}>
        <span className={styles.dataItem}>
          <C.QUINARY>
            cards
          </C.QUINARY>
          {': '}
          <B>
            {cards}
          </B>
        </span>
        <span className={styles.dataItem}>
          <C.QUINARY>
            joined
          </C.QUINARY>
          {': '}
          <B suppressHydrationWarning>
            {humanizeTime(joined, !hydrated, true)}
          </B>
        </span>
      </div>
    </div>
  );
}
