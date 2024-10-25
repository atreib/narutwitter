import { sessionsService } from "../../posts/service";
import * as emailUtils from "../utils/email";
import * as tokenUtils from "../utils/token";
import { IAuthService } from "./types";

const authService: IAuthService = {
  login: async (email: string) => {
    const token = await tokenUtils.generateToken();
    await sessionsService.createSession({ email, token });
    await emailUtils.sendMagicLinkEmail(email, token);
  },
  verify: async (email: string, token: string) => {
    const session = await sessionsService.getSession({
      email,
      token,
    });
    if (!session) throw new Error("Invalid session");
    const isValid = await tokenUtils.verifyToken(token);
    if (!isValid) throw new Error("Invalid token");
    await sessionsService.deleteSession({ email });
    // TODO: Validate session age
    return session;
  },
};

export { authService };
