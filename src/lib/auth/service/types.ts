import { Session } from "@/lib/posts/service/db/types";

type IAuthService = {
  login: (email: string) => Promise<void>;
  verify: (email: string, token: string) => Promise<Session>;
};

export type { IAuthService };
