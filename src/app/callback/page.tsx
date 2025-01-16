import React from "react";
import {
  createUser,
  getUserById,
  getUserWithNoConnection,
  getAllMatched,
} from "../../../neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import HomePage from "@/components/HomePage";
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
async function Page() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }
  let userWithNoConnection;

  try {
    const user = await getUser();
    console.log("this is user id im printing"+user?.id);
    const allMatch = await getAllMatched(user?.id as string);
    console.log(allMatch);

    if (user) {
      const dbUser = await getUserById(user.id);
      console.log(dbUser);

      if (dbUser === null) {
        await createUser({
          applicationId: user.id,
          email: user.email || "dumyy@mail.com",
          firstname: user.given_name || "john",
          lastname: user.family_name || "doe",
        });
      }
    }
    if(user.id!=null) {
    userWithNoConnection = await getUserWithNoConnection(user?.id as string);
    console.log(userWithNoConnection);
  }
  } catch (error) {
    console.error("Error processing user:", error);
  }
  const user = await getUser();
  const me = await getUserById(user?.id as string);

  return (
    <div className="bg-gradient-to-r from-amber-300	 to-orange-400">
      <HomePage currentUser={me} users={userWithNoConnection || []} />
    </div>
  );
}

export default Page;
