import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login-Seite immer durchlassen
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Alle anderen /admin-Routen schützen
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("liva_admin");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || !session || session.value !== adminPassword) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
