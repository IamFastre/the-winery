"use client";
import { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { GoPencil } from "@icons/go/GoPencil";
import { GoTrash } from "@icons/go/GoTrash";
import { IoArrowBack } from "@icons/io5/IoArrowBack";
import { IoArrowForward } from "@icons/io5/IoArrowForward";
import { IoBookmarkOutline } from "@icons/io5/IoBookmarkOutline";
import { IoBuildOutline } from "@icons/io5/IoBuildOutline";
import { IoCloseOutline } from "@icons/io5/IoCloseOutline";
import { IoEllipsisHorizontalOutline } from "@icons/io5/IoEllipsisHorizontalOutline";
import { IoFolderOutline } from "@icons/io5/IoFolderOutline";
import { IoSaveOutline } from "@icons/io5/IoSaveOutline";

import { humanizeTime } from "@/utils";
import { cropAvatar, focusable } from "@/utils/client";
import { Modal } from "@/providers/ModalProvider";
import { editAvatar, editProfile } from "@/supabase/actions/user";
import { UserInfo } from "@/utils/api/user/info";
import { useHydration } from "@/hooks";
import { Button } from "@/components/Button";
import { C, B } from "@/components/C";
import { LabelTitle } from "@/components/LabelTitle";
import { OptionsModal } from "@/components/Modals";

import { ProfileTextStuff } from "./server";

import colors from "@/styles/colors.js";
import styles from "./styles.module.scss";

const GENDERS = [null, 'male', 'female', 'toaster'] as UserInfo['gender'][];

export function ProfileEditor({ profile }:{ profile:UserInfo }) {
  const router = useRouter();

  const [editing, setEditing] = useState<boolean>(false);
  const showOptionsState = useState<boolean>(false);
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>(profile.display_name ?? profile.username);
  const [bio, setBio] = useState<string>(profile.bio);
  const [gender, setGender] = useState<number>(GENDERS.indexOf(profile.gender));
  const [d, setD] = useState<number | undefined>(profile.anniversary?.d);
  const [m, setM] = useState<number | undefined>(profile.anniversary?.m);

  const formChanged =
    (profile.display_name ?? "") !== displayName ||
    profile.bio !== bio ||
    profile.gender !== GENDERS[gender] ||
    d !== profile.anniversary?.d ||
    m !== profile.anniversary?.m;

  const changed = !!avatarData || formChanged;

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
    setD(profile.anniversary?.d);
    setM(profile.anniversary?.m);
  }

  const onSubmitImage:ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    if (e.target.files?.[0]) {
      const reader = new FileReader;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        cropAvatar(reader.result as string, s => {
          setAvatarData(s);
        });
      };
    }
  };

  const onSubmitChanges = async () => {
    if (editing) {
      if (avatarData)
        await editAvatar(avatarData);

      if (formChanged)
        await editProfile({
          display_name: displayName,
          bio,
          gender: GENDERS[gender],
          anniversary: isNaN(m??0) && isNaN(d??0)
                     ? null
                     : m && d
                     ? { m, d }
                     : undefined
        });

      if (changed) {
        setEditing(false);
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
        {editing ? (
          <div className={styles.avatarEdit}>
            <div className={styles.avatarEditIcon}>
              <GoPencil />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={onSubmitImage}
              {...focusable(styles.active)}
            />
          </div>
        ) : null}
        {editing && avatarData ? (
          <div
            className={styles.avatarRemoveIcon}
            {...focusable("", () => setAvatarData(null))}
          >
            <GoTrash />
          </div>
        ) : null}
      </div>
      {editing ? (
        <div className={styles.form}>
          <label>
            <LabelTitle title="Display name" />
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onBlur={() => setDisplayName((d) => d.trim())}
              name="username"
              autoComplete="off"
              spellCheck={false}
              type="text"
              placeholder={
                (profile.display_name ?? profile.username) + ` (max. 32)`
              }
              maxLength={32}
            />
            <div className={styles.maxLength}>
              <C.SECONDARY>
                {displayName.length === 32 ? (
                  <C.RED>{displayName.length}</C.RED>
                ) : (
                  <C.ACCENT>{displayName.length}</C.ACCENT>
                )}
                /32
              </C.SECONDARY>
            </div>
          </label>
          <label>
            <LabelTitle title="About me" />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => setBio((b) => b.trim())}
              name="description"
              autoComplete="off"
              placeholder={profile.bio + ` (max. 256)`}
              maxLength={256}
            />
            <div className={styles.maxLength}>
              <C.SECONDARY>
                {bio.length === 256 ? (
                  <C.RED>{bio.length}</C.RED>
                ) : (
                  <C.ACCENT>{bio.length}</C.ACCENT>
                )}
                /256
              </C.SECONDARY>
            </div>
          </label>
          <label>
            <LabelTitle title="Gender" />
            <div className={styles.gender}>
              <Button
                icon={{ element: IoArrowBack }}
                onClick={() => setGender(g => (g - 1 + GENDERS.length) % GENDERS.length)}
                noMinimum
              />
              <Button
                title={GENDERS[gender] ?? 'none'}
                className={styles.genderName}
                color={
                  GENDERS[gender] === "male"
                  ? colors.cyan
                  : GENDERS[gender] === "female"
                  ? colors.magenta
                  : GENDERS[gender] === "toaster"
                  ? colors.yellow
                  : colors.secondary
                }
              />
              <Button
                icon={{ element: IoArrowForward }}
                onClick={() => setGender(g => (g + 1) % GENDERS.length)}
                noMinimum
              />
            </div>
          </label>
          <label>
            <LabelTitle title="Anniversary" />
            <div className={styles.anniversary}>
              <input
                type="number"
                value={d}
                onChange={(e) => setD(e.target.valueAsNumber)}
                placeholder={
                  profile.anniversary ? `Day - ${profile.anniversary.d}` : "Day"
                }
                inputMode="numeric"
                min={1}
                max={31}
              />
              <input
                type="number"
                value={m}
                onChange={(e) => setM(e.target.valueAsNumber)}
                placeholder={
                  profile.anniversary
                    ? `Month - ${profile.anniversary.m}`
                    : "Month"
                }
                inputMode="numeric"
                min={1}
                max={12}
              />
            </div>
          </label>
        </div>
      ) : (
        <ProfileTextStuff profile={profile} />
      )}
      <div className={styles.buttonRack}>
        <Button
          title={editing ? "Save Changes" : "Edit Profile"}
          icon={{ element: editing ? IoSaveOutline : IoBuildOutline }}
          className={styles.button}
          onClick={onSubmitChanges}
          disabled={editing && !changed}
          noBrackets
          noMinimum
        />
        <Button
          icon={{
            element: editing ? IoCloseOutline : IoEllipsisHorizontalOutline,
          }}
          className={`${styles.button} ${styles.bigIcon}`}
          color={editing ? colors.red : colors.accent}
          onClick={editing ? cancel : openMenu}
          iconBackground
          noMinimum
        />
      </div>

      <Modal state={showOptionsState}>
        <OptionsModal
          close={closeMenu}
          options={[
            { title: "Saved", icon: IoBookmarkOutline, href: "/saved" },
            { title: "Drafts", icon: IoFolderOutline, href: "/drafts" },
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
