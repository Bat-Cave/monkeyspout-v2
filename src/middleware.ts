import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["((?!^/admin).*)"],
  // afterAuth(auth, req, evt) {
  //   // console.log({ auth, req, evt });
  //   // console.log(auth);
  // },
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
