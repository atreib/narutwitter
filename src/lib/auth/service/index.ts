import * as emailUtils from "../utils/email";
import { shortSessionService } from "../utils/short-session";
import * as tokenUtils from "../utils/token";
import { IAuthService } from "./types";
import * as cookiesUtils from "../utils/cookies";
import { Session } from "../types";
import { userService } from "@/lib/users";
import { redirect } from "next/navigation";

const authService: IAuthService = {
  sendLoginLink: async (email: Session["email"]) => {
    const token = await tokenUtils.generateToken();
    await shortSessionService.createSession({ email, token });
    await emailUtils.sendMagicLinkEmail(email, token);
  },
  verifyLoginLinkOrThrow: async (
    email: Session["email"],
    token: Session["token"]
  ) => {
    const session = await shortSessionService.getSession({
      email,
      token,
    });
    if (!session) throw new Error("Invalid session");
    const isValid = await tokenUtils.verifyToken(token);
    if (!isValid) throw new Error("Invalid token");
    await shortSessionService.deleteSession({ email });
    // TODO: Validate session age
    return session;
  },
  createCookieSession: async (session: Session) => {
    await cookiesUtils.createSession(session);
  },
  requireCookieSession: async () => {
    const session = await cookiesUtils.requireCookieSession();
    const authenticatedUser = await userService.getUserByEmail({
      email: session.email,
    });
    if (!authenticatedUser) return redirect("/login");
    return authenticatedUser;
  },
  destroyCookieSession: async () => {
    await cookiesUtils.destroyCookieSession();
  },
};

export { authService };
