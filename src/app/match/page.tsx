import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Match from "@/components/Match";
import { getAllMatched, getUserById } from "../../../neo4j.action";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user?.id) {
    redirect('/api/auth/login');
  }

  try {
    const [currentUser, allMatchedUsers] = await Promise.all([
      getUserById(user.id),
      getAllMatched(user.id)
    ]);

    return <Match users={allMatchedUsers} currentUser={currentUser} />;
  } catch (error) {
    console.error('Error loading match page:', error);
    return <div>Something went wrong. Please try again later.</div>;
  }
};

export default page;