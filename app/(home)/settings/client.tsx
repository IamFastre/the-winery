"use client";
import { useState } from "react";
import { IconType } from "@react-icons/all-files";
import { IoColorPalette } from "@icons/io5/IoColorPalette";
import { IoBrushOutline } from "@icons/io5/IoBrushOutline";
import { IoMapOutline } from "@icons/io5/IoMapOutline";
import { IoHeartHalf } from "@icons/io5/IoHeartHalf";

import { themes } from "@/utils/consts";
import { capitalize, LocalStorage, StorageEntry, themeify } from "@/utils";
import { useAppContext } from "@/providers/AppContext";
import { DropdownButton, Option } from "@/components/DropdownButton";
import { Button } from "@/components/Button";
import { signOut } from "@/supabase/actions/user";

import colors from "@/styles/colors";
import styles from "./styles.module.scss";

const Header = ({ title, Icon }:{ title:string; Icon?:IconType }) => (
  <span id={title.toLowerCase().replaceAll(/\W+/g, "-")} className={styles.header}>
    {title}
    {Icon && <Icon />}
  </span>
);

const Setting = ({ title, description, children }:{ title:string; description?:string; children:React.ReactNode; }) => {
  return (
    <div className={styles.setting}>
      <div className={styles.title}>
        <span>
          {title}
        </span>
      </div>
      { description &&
        <div className={styles.description}>
          {description}
        </div>
      }
      {children}
    </div>
  );
};

function ThemeSetting() {
  const { theme } = useAppContext();
  const t = themeify(theme.name!, theme.variant);
  const [title, subtitle] = t.split(":");

  const onSelectTheme = (o:Option) => {
    document.children[0].setAttribute("data-theme", o.title.toLowerCase());
    document.children[0].setAttribute("data-theme-variant", o.subtitle?.toLowerCase() ?? "none");
  };

  return (
    <Setting
      title="Theme"
      description="decides the color palette and styling for your client."
    >
      <DropdownButton
        title={capitalize(title)}
        subtitle={subtitle}
        icon={IoColorPalette}
        onSelect={onSelectTheme}
        selectedIndices={[themes.indexOf(t)]}
        options={themes.map(capitalize).map(o => {
          const [name, variant] = o.split(":");
          return {
            title: name,
            subtitle: variant
          }
        })}
        style="bottom"
        noWith
      />
    </Setting>
  );
}

function GotoSetting() {
  const [on, setOn] = useState<boolean>(LocalStorage.get('settings:goto-delay'));

  const onClick = () => {
    setOn(o => {
      LocalStorage.set('settings:goto-delay', !o);
      return !o
    });
  };

  return (
    <Setting
      title="Navbar Delay"
      description="decides whether to delay and do the navigation animation or not."
    >
      <Button
        title={on ? "on" : "off"}
        color={on ? colors.green : colors.red}
        icon={{ element: IoHeartHalf }}
        onClick={onClick}
      />
    </Setting>
  );
}

function SignOutButton() {
  const onReset = () => {
    const len = localStorage.length;

    for (let i = 0; i < len; i++)
      LocalStorage.remove(localStorage.key(0) as keyof StorageEntry);

    location.reload();
  }

  const onLogOut = async () => {
    await signOut();
    location.reload();
  };

  return (
    <div className={styles.setting}>
      <div className={styles.tray}>
        <Button
          title="Rest Settings"
          color={colors.highlight}
          onClick={onReset}
        />
        <Button
          title="Log Out"
          color={colors.hot}
          onClick={onLogOut}
        />
      </div>
    </div>
  );
}

export function Settings() {
  return (
    <div className={styles.settings}>
      <Header title="Navigation" Icon={IoMapOutline} />
      <GotoSetting />
      <Header title="Appearance" Icon={IoBrushOutline} />
      <ThemeSetting />
      <SignOutButton />
    </div>
  );
}
