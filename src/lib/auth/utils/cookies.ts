import "server-only";

import { cookies } from "next/headers";
import { Session } from "../types";
import { redirect } from "next/navigation";
import * as tokenUtils from "./token";

const cookieName = "session";

export async function createSession(session: Session) {
  const oneDay = 24 * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + oneDay);
  const cookieStore = await cookies();
  cookieStore.set(cookieName, JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function requireCookieSession() {
  const cookieStore = await cookies();
  const sessionCookieValue = cookieStore.get(cookieName);
  if (!sessionCookieValue) return redirect("/login");
  const session = JSON.parse(sessionCookieValue.value) as Session;
  if (!tokenUtils.verifyToken(session.token)) {
    cookieStore.delete(cookieName);
    return redirect("/login");
  }
  return session;
}

export async function destroyCookieSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
