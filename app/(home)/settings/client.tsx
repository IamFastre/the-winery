"use client";
import { useState } from "react";
import { IconType } from "@react-icons/all-files";
import { IoColorPalette } from "@icons/io5/IoColorPalette";
import { IoBrushOutline } from "@icons/io5/IoBrushOutline";

import { options } from "@/utils/consts";
import { capitalize, StorageEntry } from "@/utils";
import { DropdownButton } from "@/components/DropdownButton";

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

export function ThemeSetting() {
  const [themeI, setThemeI] = useState<number>(
    options['settings']['theme'].indexOf(
      document.children[0].getAttribute("data-theme") as StorageEntry['settings:theme'] ?? 'dark'
    )
  );

  const onSelectTheme = (o:string, i:number) => {
    document.children[0].setAttribute("data-theme", o.toLowerCase());
    setThemeI(i);
  };

  return (
    <Setting
      title="Theme"
      description="decides the color palette and styling for your client."
    >
      <DropdownButton
        title={capitalize(options['settings']['theme'][themeI])}
        icon={IoColorPalette}
        onSelect={onSelectTheme}
        selectedIndices={[themeI]}
        options={options['settings']['theme'].map(capitalize)}
        style="bottom"
        noWith
      />
    </Setting>
  );
}

export function Settings() {
  return (
    <div className={styles.settings}>
      <Header title="Appearance" Icon={IoBrushOutline} />
      <ThemeSetting />
    </div>
  );
}
