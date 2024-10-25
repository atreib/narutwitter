import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  handle: z.string(),
});
type User = z.output<typeof userSchema>;

type IUserService = {
  getUserByEmail: (props: {
    email: User["email"];
  }) => Promise<User | undefined>;
  createUser: (props: { email: User["email"] }) => Promise<User>;
};

export { userSchema };
export type { IUserService, User };
