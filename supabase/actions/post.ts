"use server";
import XRegExp from "xregexp";
import { createClient } from "@/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { getUserInfo } from "@/utils/api/user/info";

/* ========================================================================== */
/*                                  Updating                                  */
/* ========================================================================== */

async function editCard(table:'posts' | 'drafts', id:number, title:string | null, content:string) {
  const supabase = createClient();

  title = title?.length ? title : null;
  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 8)
    return { data: null, error: {} as PostgrestError };

  return await supabase
    .from(table)
    .update({ title, content })
    .eq('id', id)
    .select()
    .single();
}

// export async function editPost(id:number, title:string | null, content:string) {
//   return editCard('posts', id, title, content);
// }

export async function editDraft(id:number, title:string | null, content:string) {
  return editCard('drafts', id, title, content);
}

/* ========================================================================== */
/*                                   Writing                                  */
/* ========================================================================== */

async function createCard(table:'posts' | 'drafts', title:string | null, content:string) {
  const supabase = createClient();
  const { data:user, error } = await getUserInfo('self');

  if (!user || error)
    return { data: null, error };

  title = title?.length ? title : null;
  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 8)
    return { data: null, error: {} as PostgrestError };

  return await supabase
    .from(table)
    .insert([{ title, content, author: user.identifier }])
    .select();
}

export async function createPost(title:string, content:string) {
  return await createCard('posts', title, content)
}

export async function createDraft(title:string, content:string) {
  return await createCard('drafts', title, content)
}

/* ========================================================================== */

export async function likePost(id:number, action: 'like' | 'unlike') {
  const supabase = createClient();
  const { data:user } = await getUserInfo('self');

  if (!user)
    return false;

  const res = action === 'like'
    ? await supabase
        .from('likes')
        .insert({ user: user.identifier, post: id })
    : await supabase
        .from('likes')
        .delete()
        .eq('user', user.identifier)
        .eq('post', id);

  return res.error === null;
}

export async function savePost(id:number, action: 'save' | 'unsave') {
  const supabase = createClient();
  const { data:user } = await getUserInfo('self');

  if (!user)
    return false;

  const res = action === 'save'
    ? await supabase
        .from('saves')
        .insert({ user: user.identifier, post: id })
    : await supabase
        .from('saves')
        .delete()
        .eq('user', user.identifier)
        .eq('post', id);

  return res.error === null;
}

/* ========================================================================== */
/*                                  Deleting                                  */
/* ========================================================================== */

async function deleteCard(table:'posts' | 'drafts', id:number) {
  const supabase = createClient();

  return await supabase
    .from(table)
    .delete()
    .eq('id', id)
    .select()
    .single();
}

// export async function deletePost(id:number) {
//   return deleteCard('posts', id);
// }

export async function deleteDraft(id:number) {
  return deleteCard('drafts', id);
}
