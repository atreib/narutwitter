import { db } from "../db/database";
import { IUserService } from "./types";

const userService: IUserService = {
  getUserByEmail: async ({ email }) => {
    return db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  },
  createUser: async ({ email }) => {
    const name = email.split("@")[0];
    const handle = email.split("@")[0];
    const user = await db
      .insertInto("users")
      .values({ email, name, handle })
      .returningAll()
      .executeTakeFirstOrThrow();
    return user;
  },
};

export { userService };
