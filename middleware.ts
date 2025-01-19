import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import createSupabaseServerClient from "./lib/supabase/server";

export async function middleware(req: NextRequest) {
  // Add CORS headers for iframe compatibility
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Skip auth check for iframe requests
  const isIframe = req.headers.get("sec-fetch-dest") === "iframe";
  if (isIframe) {
    return response;
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (["/login"].includes(req.nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return await updateSession(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
