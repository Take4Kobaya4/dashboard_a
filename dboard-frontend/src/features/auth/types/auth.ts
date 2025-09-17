import type { User } from "../../users/types/user"


export type AuthType = {
    user: User;
    token?: string;
}
