import type { AccessTokenType } from "./access-token.type";
import type { UserInfoType } from "./user-info.type";

export type AuthType = {
    isLoggedIn: boolean;
    users: UserInfoType;
    token: AccessTokenType;
    permissions: string[];
}