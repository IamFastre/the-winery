'use client';
import { B, C } from '@/components';
import { humanizeTime } from '@/utils';
import { useHydration } from '@/hooks';

import styles from './styles.module.scss';

interface Props {
  cards: number;
  joined: number | string;
}

export function DataBox({ cards, joined }:Props) {
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
