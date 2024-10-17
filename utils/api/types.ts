import type { UserInfo, UserInfoParams } from "@/app/api/user/info/route";

interface Endpoint<A,R> {
  Arguments: A;
  Return: R;
}

export interface Endpoints {
  "/user/info":      Endpoint<UserInfoParams, UserInfo>,
}
