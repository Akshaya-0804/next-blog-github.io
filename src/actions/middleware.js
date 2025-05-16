import { NextResponse } from "next/dist/server/web/spec-extension/response";

const protectedRoutes = ["/dashboard", "/post/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
    const isPublic = publicRoutes.includes(path);

    console.log(path);
    const user = await getAuthUser();
    const userId = user?.userId;
    if (isProtected && !userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      
      }
    if (isPublic && userId) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));

    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/dashboard", '/posts/:path*'],
};



   