import { Section } from "@/components/Section";
import { getProfile } from "@/supabase/actions/user";
import { getDraft } from "@/supabase/actions/post";
import { Draft } from "@/supabase/actions/types";

import { DraftEditor, PostEditor } from "./client";
import styles from "./styles.module.scss";


export default async function ComposePage({ searchParams }:{ searchParams: { draft:string | undefined; } }) {
  const { data:user, error } = await getProfile();
  let draft:Draft | null = null;

  if (!user || error)
    return;

  if (searchParams.draft) {  
    const id = Number.parseInt(searchParams.draft);
    if (Number.isInteger(id))
      draft = (await getDraft(id)).data;
  }

  return (
    <Section title="Compose" style={{ flex: 1 }} containerClassName={styles.sectionContent}>
      <div className={styles.title}>
        <span>
          {draft ? "Edit Draft" : "Create Post"}
        </span>
        <hr />
      </div>
      {
        draft ?
        <DraftEditor user={user} draft={draft} />
        :
        <PostEditor user={user} />
      }
    </Section>
  );
}
