"use client";
import { useState } from 'react';
import { IconType } from "@react-icons/all-files";
import { IoCaretDown } from "@icons/io5/IoCaretDown";

import { C } from '@/components/C';

import styles from "./style.module.scss";

export type Option = {
  title: string;
  subtitle?: string;
}

interface DropdownButtonProps {
  title: string | JSX.Element;
  subtitle?: string;
  icon?: IconType;
  options: Readonly<Option[]>;
  selectedIndices: number[];
  onSelect: (option:Option, index:number) => void;
  style?: "auto" | "top" | "bottom";
  floating?: boolean;
  noWith?: boolean;
}

export function DropdownButton({ title, subtitle, icon, options, selectedIndices, onSelect, style, floating, noWith }:DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option:Option, index:number) => {
    onSelect(option, index);
    setIsOpen(false);
  };

  const Icon = icon;
  const cls = style === 'top' ? styles.top : style === 'bottom' ? styles.bottom : '';

  return (
    <div className={`${styles.container} ${noWith ? styles.noWith : ""} ${cls}`}>
      <div
        className={`${styles.head} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
      >
        <div className={styles.headContent}>
          { Icon && <Icon /> }
          <div>
            <span>{title}</span>
            { subtitle &&
              <span className={styles.subtitle}>
                {subtitle}
              </span>
            }
          </div>
        </div>
        <IoCaretDown className={`${styles.caret} ${isOpen ? styles.open : ""}`} />
      </div>
      <div className={`${styles.options} ${floating ? styles.floating : ""} ${isOpen ? styles.open : ""}`}>
        {
          options.map((option, i) => (
            <div
              className={`${styles.option} ${selectedIndices.includes(i) ? styles.selected : ""}`}
              onClick={() => handleSelect(option, i)}
              key={i}
            >
              <span>
                {option.title}
                { option.subtitle &&
                  <C.SECONDARY style={{ marginLeft: '0.5ch', fontSize: 'smaller' }}>
                    {option.subtitle}
                  </C.SECONDARY>
                }
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
