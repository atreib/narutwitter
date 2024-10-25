import { authService } from "@/lib/auth/service";
import { userService } from "@/lib/users";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    if (!email || !token) throw new Error("Invalid request");

    const session = await authService.verifyLoginLinkOrThrow(email, token);

    let user = await userService.getUserByEmail({ email });
    if (!user) {
      user = await userService.createUser({ email });
    }

    await authService.createCookieSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.warn("Could not authenticate user: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
