"use client";
import { useState } from 'react';

import styles from "./style.module.scss";
import { IoCaretDown } from '@react-icons/all-files/io5/IoCaretDown';

interface DropdownButtonProps {
  title: string | JSX.Element;
  subtitle?: string;
  options: string[];
  selectedIndices: number[];
  onSelect: (option:string, index:number) => void;
}

export function DropdownButton({ title, subtitle, options, selectedIndices, onSelect }:DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option:string, index:number) => {
    onSelect(option, index);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.head} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
      >
        <div>
          <span>{title}</span>
          { subtitle &&
            <span className={styles.subtitle}>
              {subtitle}
            </span>
          }
        </div>
        <IoCaretDown className={`${styles.icon} ${isOpen ? styles.open : ""}`} />
      </div>

      <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
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
