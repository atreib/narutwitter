import { authService } from "@/lib/auth/service";

export async function GET() {
  try {
    await authService.destroyCookieSession();
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  } catch (error) {
    console.warn("Could not authenticate user: ", error);
    return Response.json({ error }, { status: 500 });
  }
}
