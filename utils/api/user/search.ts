import { result } from '@/utils/api';
import { createClient } from '@/supabase/server';

import { getUserInfo, UserInfo } from "@/utils/api/user/info";

export type UserSearch = UserInfo[];
export type UserSearchParams = { q:string };

const escape = (s:string) => "\\" + s;

function cureUsername(value:string) {
  return value
    .replaceAll(/[^a-z0-9_-]/gi, '•');
}

function cureDisplayName(value:string) {
  return value
    .replaceAll(/[\,\.\:\(\)\"\\]/gi, escape)
    .replaceAll(/[\%\_\$\^\{\}]/gi, escape);
}

export async function getUserSearch(query:string) {
  const supabase = createClient();

  const u = cureUsername(query);
  const d = cureDisplayName(query);

  const res = await supabase
    .from('profiles')
    .select('id')
    .or(`username.ilike.%${u}%, display_name.ilike.%${d}%`);

  if (res.error)
    return result<null>(null, res.error);


  const r:UserInfo[] = []
  for (let i = 0; i < res.data.length; i++) {
    const u = res.data[i];
    const user = await getUserInfo("id", u.id);

    if (user.error)
      return result<null>(null, user.error);
    r.push(user.data);
  }

  return result<UserSearch | null>(r, res.error);
}
