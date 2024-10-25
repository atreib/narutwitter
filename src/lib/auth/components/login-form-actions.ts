"use server";

import { authService } from "../service";

export async function handleLogin(email: string) {
  await authService.sendLoginLink(email);
}
