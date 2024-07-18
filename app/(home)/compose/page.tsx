import { Section } from "@/components/Section";

import { PostEditor } from "./client";
import styles from "./styles.module.scss";
import { getUser } from "@/utils/server";


export default async function ComposePage() {
  const { data:user, error } = await getUser();

  if (!user)
    return;

  return (
    <Section title="Compose" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <div className={styles.title}>
        <span>
          Create Post
        </span>
        <hr />
      </div>
      <PostEditor
        user={user}
        error={!!error}
      />
    </Section>
  );
}
