import { B, C } from '@/components/C';

import styles from './style.module.scss';

export function DataBox({ data }: { data:{ [key:string]:string | number } }) {
  return (
    <div className={styles.dataBox}>
      <div className={styles.data}>
        {Object.keys(data).map(key => (
          <span className={styles.dataItem}>
            <C.QUINARY>
              {key}
            </C.QUINARY>
            {': '}
            <B>
              {data[key]}
            </B>
          </span>
        ))}
      </div>
    </div>
  );
}
