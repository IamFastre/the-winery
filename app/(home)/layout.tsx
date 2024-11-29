import { Toaster } from "@/providers/Toaster";
import { getUserInfo } from "@/utils/api/user/info";

import { HomeShortcuts } from "./shortcuts";
import { Sidebar } from "./client";
import styles from "./layout.module.scss";

export default async function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const self = (await getUserInfo('self')).data;

  return (
    <div className={styles.body}>
      {/* TODO: Resizable bar + icon title */}
      <div className={styles.bar}>
        <Sidebar username={self!.username} />
      </div>
      <div className={styles.page}>
        <Toaster>
          {children}
          <HomeShortcuts />
        </Toaster>
      </div>
    </div>
  );
}
