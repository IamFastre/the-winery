import { createClient } from '@/supabase/server';
import { Tables } from '@/supabase/types';
import { badRequest, notFound, success } from '@/utils/api';
import { NextRequest } from 'next/server';

export type UserInfo = Tables<'profiles'> & { mail_confirmed: boolean };
export type UserInfoParams = { id:string } | { username:string };

export async function GET(request:NextRequest) {
  const { searchParams: params } = new URL(request.url);
  const supabase = createClient();

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  let error:Error | null = null;

  if (params.has('id')) {
    const id = params.get('id')!;
    const userRes = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (userRes.error)
      return notFound(userRes.error, headers);
    
    const confRes = await supabase.rpc('is_confirmed', { id });

    if (confRes.error)
      return notFound(confRes.error, headers);

    return success<UserInfo>({
      ...userRes.data,
      mail_confirmed: confRes.data
    }, headers);
  }

  if (params.has('username')) {
    const username = params.get('username')!;
    const userRes = await supabase
      .from('profiles')
      .select('*')
      .eq('identifier', username.toLowerCase())
      .single();

      if (userRes.error)
      return notFound(userRes.error, headers);
    
    const confRes = await supabase.rpc('is_confirmed', { id: userRes.data.id });

    if (confRes.error)
      return notFound(confRes.error, headers);

    return success<UserInfo>({
      ...userRes.data,
      mail_confirmed: confRes.data
    }, headers);
  }

  return badRequest({ code: 400, message: "Please supply an id/username parameter" }, headers);
}
