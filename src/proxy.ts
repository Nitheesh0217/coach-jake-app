import { NextResponse, type NextRequest } from "next/server";
import { supabaseMiddleware } from "@/lib/supabaseClient";

const PROTECTED_PREFIXES = ["/dashboard", "/workouts", "/leaderboard", "/coach", "/finish-profile"];
const COACH_PREFIX = "/coach";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const res = NextResponse.next();
  const supabase = supabaseMiddleware(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith(COACH_PREFIX)) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (error || profile?.role !== "coach") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/workouts/:path*", "/leaderboard/:path*", "/coach/:path*", "/finish-profile/:path*"],
};
