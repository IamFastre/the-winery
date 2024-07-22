import { Section } from "@/components/Section";
import { getProfile } from "@/supabase/actions/user";

import { PostEditor } from "./client";
import styles from "./styles.module.scss";


export default async function ComposePage() {
  const { data:user, error } = await getProfile();

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
        error={error}
      />
    </Section>
  );
}
