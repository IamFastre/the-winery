import type { Session, User } from "@supabase/supabase-js";
import type { ErrorCode } from "@supabase/auth-js/src/lib/error-codes";

export interface AuthError {
  name: string;
  code?: ErrorCode | string;
  status?: number;
  message: string;
}

export interface AuthData {
  user: User | null;
  session: Session | null;
}
