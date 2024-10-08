"use server";
import XRegExp from "xregexp";
import { createClient } from "@/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { getProfile, getPublicProfile } from "./user";

/* ========================================================================== */
/*                                   Reading                                  */
/* ========================================================================== */

export async function getFeedPosts(limit:number = 20) {
  const supabase = createClient();

  return await supabase
    .from('posts')
    .select()
    .limit(limit)
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

export async function getDraftCount(identifier:string) {
  const supabase = createClient();

  return await supabase
    .from('drafts')
    .select('*', { count: 'exact', head: true })
    .eq('author', identifier.toLowerCase());
}

/* ========================================================================== */

export async function getLikeCount(id:number) {
  const supabase = createClient();

  return await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post', id);
}

export async function getSavedCount(identifier:string) {
  const supabase = createClient();

  return await supabase
    .from('saves')
    .select('*', { count: 'exact', head: true })
    .eq('user', identifier.toLowerCase());
}

export async function getUserSaved(identifier:string, limit:number = 20) {
  const supabase = createClient();

  const { data:saves, error } = await supabase
    .from('saves')
    .select()
    .eq('user', identifier.toLowerCase())
    .limit(limit)
    .order('timestamp', { ascending: false });

  if (!saves || error)
    return { data: null, error };

  const responds = await Promise.all(
    saves.map(save => getPost(save.post))
  );

  return { data: responds.map(res => res.data).filter(d => d !== null), error: null };
}

export async function getPostLikes(id:number) {
  const supabase = createClient();

  const { data:likes, error } = await supabase
    .from('likes')
    .select()
    .eq('post', id)
    .order('timestamp', { ascending: false });

  if (!likes || error)
    return { data: null, error };

  const responds = await Promise.all(
    likes.map(like => getPublicProfile(like.user))
  );

  return { data: responds.map(res => res.data).filter(d => d !== null), error: null };
}

async function isPost(id:number, what:'likes' | 'saves') {
  const supabase = createClient();
  const { data:user } = await getProfile();

  if (!user)
    return null;

  const { data:saved } = await supabase
    .from(what)
    .select()
    .eq('user', user.identifier)
    .eq('post', id);

  if (!saved)
    return null;

  return saved.length > 0;
}

export async function isPostLiked(id:number) {
  return await isPost(id, 'likes')
}

export async function isPostSaved(id:number) {
  return await isPost(id, 'saves')
}

export async function getPostInteractions(id:number) {
  const [liked, saved, { count:likeCount }] = await Promise.all([
    isPostLiked(id),
    isPostSaved(id),
    getLikeCount(id)
  ]);

  return { liked, saved, likeCount };
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
  return await getCard('posts', id);
}

export async function getDraft(id:number) {
  return await getCard('drafts', id);
}

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
  const { data:user, error } = await getProfile();

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
  const { data:user } = await getProfile();

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
  const { data:user } = await getProfile();

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
