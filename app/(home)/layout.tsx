import { Toaster } from "@/providers/Toaster";
import { Shortcuts } from "@/providers/Shortcuts";
import { getProfile } from "@/supabase/actions/user";

import { HomeShortcuts } from "./shortcuts";
import { Sidebar } from "./client";
import styles from "./layout.module.scss";

export default async function HomeLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const self = (await getProfile()).data;

  return (
    <div className={styles.body}>
      {/* TODO: Resizable bar + icon title */}
      <div className={styles.bar}>
        <Sidebar username={self!.username} />
      </div>
      <div className={styles.page}>
        <Toaster>
          <Shortcuts>
            {children}
            <HomeShortcuts />
          </Shortcuts>
        </Toaster>
      </div>
    </div>
  );
}
