import { Toaster } from "@/providers/Toaster";
import { HomeShortcutsProvider } from "@/providers/HomeShortcutsProvider";
import { getProfile } from "@/supabase/actions/user";

import { Sidebar } from "./client";
import styles from "./layout.module.scss";
import { Shortcuts } from "@/providers/Shortcuts";

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
            <HomeShortcutsProvider>
              {children}
            </HomeShortcutsProvider>
          </Shortcuts>
        </Toaster>
      </div>
    </div>
  );
}
