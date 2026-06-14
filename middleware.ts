import { NextResponse, type NextRequest } from "next/server";
import { supabaseMiddleware } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protected routes under (app)
  const protectedRoutes = [
    "/dashboard",
    "/workouts",
    "/leaderboard",
    "/finish-profile",
    "/trainer-dashboard",
  ];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // For protected routes, verify authentication
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

  // Check if user is coach for /trainer-dashboard
  if (pathname.startsWith("/trainer-dashboard")) {
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
  matcher: [
    "/dashboard/:path*",
    "/workouts/:path*",
    "/leaderboard/:path*",
    "/finish-profile/:path*",
    "/trainer-dashboard/:path*",
  ],
};
