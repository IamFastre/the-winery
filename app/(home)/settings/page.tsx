import { PageSection } from "@/components/Section";

import consts from "@/utils/consts";
import { C } from "@/components/C";

import { Settings } from "./client";
import styles from "./styles.module.scss";


export default async function SettingsPage() {
  return (
    <PageSection title="Settings" containerClassName={styles.sectionContent}>
      <div className={styles.content}>
        <Settings />
      </div>

      <div className={styles.footer}>
        <span>
          <C.ACCENT>
            <strong>
              {consts.name}
            </strong>
          </C.ACCENT>
          {' '}
          <C.SECONDARY className={styles.version}>
            <i>
              v{consts.version}
            </i>
          </C.SECONDARY>
        </span>
        <span>
          <sup>
            <C.SECONDARY>
              by
            </C.SECONDARY>
            {' '}
            <C.TERTIARY>
              <strong>
                {consts.organization}
              </strong>
            </C.TERTIARY>
          </sup>
        </span>
      </div>
    </PageSection>
  );
}
