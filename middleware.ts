import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  
  const protectedPaths = [
    "/apps",
    "/settings",
    "/profile",
    "/apps/api-keys",
  ];

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 🚫 Korumalı sayfa, token yoksa login'e yönlendir
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔒 Auth sayfasında ama zaten giriş yapılmışsa apps'e yönlendir
  if (pathname.startsWith("/auth/") && accessToken) {
    return NextResponse.redirect(new URL("/apps", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
