import type { Session, User } from "@supabase/supabase-js";
import type { ErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import type { getProfile, getPublicProfile } from "./user";
import type { getFeedPosts } from "./post";

export interface AuthError {
  name: string,
  code?: ErrorCode | string,
  status?: number,
  message: string
}

export interface AuthData {
  user: User | null;
  session: Session | null;
}

export type PublicProfile = NonNullable<Awaited<ReturnType<typeof getPublicProfile>>['data']>;
export type Profile = NonNullable<Awaited<ReturnType<typeof getProfile>>['data']>;
export type Post = NonNullable<Awaited<ReturnType<typeof getFeedPosts>>['data']>[number];
