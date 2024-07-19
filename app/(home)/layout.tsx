import { Sidebar } from "./client";
import styles from "./layout.module.scss";

export default function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return (
    <div className={styles.body}>
      {/* TODO: Resizable bar + icon title */}
      <div className={styles.bar}>
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
