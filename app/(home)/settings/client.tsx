"use client";
import { useState } from "react";
import { IconType } from "@react-icons/all-files";
import { IoColorPalette } from "@icons/io5/IoColorPalette";
import { IoBrushOutline } from "@icons/io5/IoBrushOutline";
import { IoMapOutline } from "@icons/io5/IoMapOutline";
import { IoHeartHalf } from "@icons/io5/IoHeartHalf";

import { themes } from "@/utils/consts";
import { capitalize, LocalStorage, themeify } from "@/utils";
import { useAppContext } from "@/providers/AppContext";
import { DropdownButton } from "@/components/DropdownButton";

import styles from "./styles.module.scss";
import { Button } from "@/components/Button";
import colors from "@/styles/colors";

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

  const onSelectTheme = (o:string) => {
    const [name, variant] = o.split(":");
    document.children[0].setAttribute("data-theme", name.toLowerCase());
    document.children[0].setAttribute("data-theme-variant", variant?.toLowerCase() ?? "none");
  };


  return (
    <Setting
      title="Theme"
      description="decides the color palette and styling for your client."
    >
      <DropdownButton
        title={capitalize(t)}
        icon={IoColorPalette}
        onSelect={onSelectTheme}
        selectedIndices={[themes.indexOf(t)]}
        options={themes.map(capitalize)}
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

export function Settings() {
  return (
    <div className={styles.settings}>
      <Header title="Navigation" Icon={IoMapOutline} />
      <GotoSetting />
      <Header title="Appearance" Icon={IoBrushOutline} />
      <ThemeSetting />
    </div>
  );
}
