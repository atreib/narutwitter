import { db } from "@/lib/db/database";
import { Session } from "../types";

type IShortSessionService = {
  createSession: (props: {
    email: Session["email"];
    token: Session["token"];
  }) => Promise<void>;
  deleteSession: (props: { email: Session["email"] }) => Promise<void>;
  getSession: (props: {
    email: Session["email"];
    token: Session["token"];
  }) => Promise<Session | undefined>;
};

const shortSessionService: IShortSessionService = {
  createSession: async ({ email, token }) => {
    await db
      .insertInto("sessions")
      .values({
        email,
        token,
        createdAt: new Date().toISOString(),
      })
      .execute();
  },
  deleteSession: async ({ email }) => {
    await db.deleteFrom("sessions").where("email", "=", email).execute();
  },
  getSession: async ({ email, token }) => {
    const session = await db
      .selectFrom("sessions")
      .where("email", "=", email)
      .where("token", "=", token)
      .selectAll()
      .executeTakeFirst();
    return session;
  },
};

export { shortSessionService };
