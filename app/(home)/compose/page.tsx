import { Metadata } from "next";

import consts from "@/utils/consts";
import { Section } from "@/components/Section";
import { getProfile } from "@/supabase/actions/user";
import { getCardDraft } from "@/utils/api/card/draft";
import { Tables } from "@/supabase/types";

import { DraftEditor, PostEditor } from "./client";
import styles from "./styles.module.scss";


export const metadata:Metadata = {
  title: `Compose • ${consts.name}`,
  description: `That's where you ferment your beautiful cards... at least we hope they actually are.`,
}

export default async function ComposePage({ searchParams }:{ searchParams: { draft:string | undefined; } }) {
  const { data:user, error } = await getProfile();
  let draft:Tables<'drafts'> | null = null;

  if (!user || error)
    return;

  if (searchParams.draft) {  
    const id = Number.parseInt(searchParams.draft);
    if (Number.isInteger(id))
      draft = (await getCardDraft(id)).data;
  }

  return (
    <Section title="Compose" style={{ flex: 1 }}  containerClassName={styles.sectionContent}>
      <div className={styles.content}>
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
      </div>
    </Section>
  );
}
