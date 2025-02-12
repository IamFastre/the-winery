import { HomeWallpaper } from "@/components/ThemeWallpapers";
import { DisallowAuthorized } from "@/utils/server/comps";

import styles from "../styles.module.scss";

export default async function SigningLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  const disallowAuthorized = await DisallowAuthorized({ children });

  return (
    <>
      <HomeWallpaper />
      <div className={styles.page}>
        <div className={styles.container}>
          {disallowAuthorized}
        </div>
      </div>
    </>
  );
}
