"use client";
import { useState } from 'react';
import { IconType } from "@react-icons/all-files";
import { IoCaretDown } from "@icons/io5/IoCaretDown";

import styles from "./style.module.scss";

interface DropdownButtonProps {
  title: string | JSX.Element;
  subtitle?: string;
  icon?: IconType;
  options: string[];
  selectedIndices: number[];
  onSelect: (option:string, index:number) => void;
  floating?: boolean;
  noWith?: boolean;
}

export function DropdownButton({ title, subtitle, icon, options, selectedIndices, onSelect, floating, noWith }:DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option:string, index:number) => {
    onSelect(option, index);
    setIsOpen(false);
  };

  const Icon = icon;

  return (
    <div className={`${styles.container} ${noWith ? styles.noWith : ""}`}>
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
              {option}
            </div>
          ))
        }
      </div>
    </div>
  );
}
