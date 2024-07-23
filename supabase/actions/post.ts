"use server";
import { createClient } from "@/supabase/server";
import { getProfile } from "./user";
import XRegExp from "xregexp";

/* ========================================================================== */
/*                                   Reading                                  */
/* ========================================================================== */

export async function getFeedPosts(amount:number = 5) {
  const supabase = createClient();

  return await supabase
    .from('posts')
    .select()
    .limit(amount)
    .order('timestamp', { ascending: false });
}

/* ========================================================================== */

async function getUserCards(table:'posts' | 'drafts', identifier:string) {
  const supabase = createClient();

  return await supabase
    .from(table)
    .select()
    .eq('author', identifier.toLowerCase())
    .order('timestamp', { ascending: false });
}

export async function getUserPosts(identifier:string) {
  return getUserCards('posts', identifier);
}

export async function getUserDrafts(identifier:string) {
  return getUserCards('drafts', identifier);
}

/* ========================================================================== */

async function getCard(table:'posts' | 'drafts', id:number) {
  const supabase = createClient();

  return await supabase
    .from(table)
    .select()
    .eq('id', id)
    .single();
}

export async function getPost(id:number) {
  return getCard('posts', id);
}

export async function getDraft(id:number) {
  return getCard('drafts', id);
}

/* ========================================================================== */
/*                                  Updating                                  */
/* ========================================================================== */

async function editCard(table:'posts' | 'drafts', id:number, title:string | null, content:string) {
  const supabase = createClient();

  title = title?.length ? title : null;
  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 8)
    return { data: null, error: {} };

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
  const { data:user, error } = await getProfile();

  if (!user || error)
    return { data: null, error };

  title = title?.length ? title : null;
  if (content.replaceAll(XRegExp(`\\P{L}+`, `gu`), "").length < 8)
    return { data: null, error: {} };

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
