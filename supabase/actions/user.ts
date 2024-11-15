"use server";
import { cropAvatar, getAvatarUrl, getCurrentURL } from "@/utils/server";
import { createClient } from "@/supabase/server";
import { getUserInfo, UserInfo } from "@/utils/api/user/info";

import { AuthData, AuthError } from "./types";

/* ========================================================================== */
/*                                  Updating                                  */
/* ========================================================================== */

export async function editProfile(partialUser:{ display_name?:UserInfo['display_name']; bio?:UserInfo['bio']; anniversary?:UserInfo['anniversary'] }) {
  const supabase = createClient();
  const { data:{ user }, error } = await supabase.auth.getUser();

  if (!user || error)
    return { data: null, error };

  const trimmed = {
    display_name: partialUser.display_name?.trim() as string | null | undefined,
    bio: partialUser.bio?.trim(),
    anniversary: partialUser.anniversary
  };

  if (trimmed.display_name === "")
    trimmed.display_name = null;

  return await supabase
    .from('profiles')
    .update(trimmed)
    .eq('id', user.id)
    .select()
    .single();
}

export async function editAvatar(base64Image:string | null) {
  const supabase = createClient();
  const { data:user, error } = await getUserInfo('self');

  if (!user)
    return { data: null, error };

  let url:string | null = null;

  if (base64Image) {
    const cropped = (await cropAvatar(base64Image));
    
    if (!cropped)
      return { data: null, error: null };
    
    const blob = await (await fetch(cropped)).blob();
    const file = new File([blob], `avatar`, { type: 'image/png' });

    const res = await supabase.storage
      .from('profiles')
      .upload(`${user.username.toLowerCase()}/${file.name}`, file, { contentType: 'image/png', upsert: true });

    if (res.error)
      return res;
    else
      url = `${supabase.storage.from('profiles').getPublicUrl(res.data.path).data.publicUrl}?created=${Date.now()}`;
  } else {
    const res = await supabase.storage
      .from('profiles')
      .remove([`${user.username.toLowerCase()}/avatar`]);

    if (res.error)
      return res;
    else
      url = await getAvatarUrl(user.username);
  }

  return await supabase
    .from('profiles')
    .update({ avatar: url })
    .eq('id', user.id);
}

/* ========================================================================== */
/*                                Authorization                               */
/* ========================================================================== */

const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[?!@#$%~^&()\[\]\{\}\.\,\-\+\*\/=\\]).{1,}$/;

export async function signUp(username:string, email:string, password:string) {
  const supabase = createClient();

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emailRegex.test(email) && password.length > 7 && passwordRegex.test(password)) {
    const { data: dt, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: await getCurrentURL(),
        data: { username },
      }
    });

    data  = dt.user ? dt : null;
    error = err ? { name: err.name, code: err.code, status: err.status, message: err.message } : null;
  }

  return {
    data,
    error
  };
}

export async function signIn(email:string, password:string) {
  const supabase = createClient();

  let data:AuthData | null = null;
  let error:AuthError | null = null;

  if (emailRegex.test(email) && password.length > 7) {
    const { data: dt, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    data  = dt.user ? dt : null;
    error = err ? { name: err.name, code: err.code, status: err.status, message: err.message } : null;
  }

  return {
    data,
    error
  };
}

export async function resetPassword(password:string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({ password });

  return { data, error: JSON.parse(JSON.stringify(error))}
}

export async function sendResetPassword(email:string) {
  const supabase = createClient();

  if (emailRegex.test(email))
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: await getCurrentURL(),
    });

  return { data: null, error: "Bad email" };
}
