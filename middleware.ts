// middleware.ts
import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";

export const config = {
  matcher: [
    "/match",
    "/callback",
    // Add other protected routes here
  ],
};

export default authMiddleware;