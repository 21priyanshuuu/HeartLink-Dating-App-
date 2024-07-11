import { getAllMatched } from "../../../neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Match from "../../components/Match";

const page = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const allMatchedUsers = await getAllMatched(user?.id as string);
  console.log(user, allMatchedUsers);
  return <Match users={allMatchedUsers} />;
};

export default page;
