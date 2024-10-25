import { User } from "@/lib/users/types";
import { Session } from "../types";

type IAuthService = {
  sendLoginLink: (email: Session["email"]) => Promise<void>;
  verifyLoginLinkOrThrow: (
    email: Session["email"],
    token: Session["token"]
  ) => Promise<Session>;
  createCookieSession: (user: Session) => Promise<void>;
  requireCookieSession: () => Promise<User>;
  destroyCookieSession: () => Promise<void>;
};

export type { IAuthService };
