// 'use client'
// import {
//   createUser,
//   getUserById,
//   getUserWithNoConnection,
//   // getAllMatched,
// } from "../../../neo4j.action";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import {ThreeDCardDemo} from "../../components/cardAsc"
// import axios from "axios";
// import { useEffect, useState } from "react";
// export const dynamic = 'force-dynamic';
// export const fetchCache = 'force-no-store';
// async function Page() {
//   const [userId,setUserId]=useState()
//   const [userData,setUserData]=useState([])

//   const { isAuthenticated, getUser } = getKindeServerSession();

//   if (!isAuthenticated) {
//     return <div>Please log in to view this page.</div>;
//   }
//   let userWithNoConnection;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (userId !== undefined) {
//         try {
//           const userWithNoConnection = await getUserWithNoConnection(userId);
//           const applicationIdOfUnmatchUsers = userWithNoConnection.map(
//             (user) => user.applicationId
//           );
  
//           console.log(applicationIdOfUnmatchUsers);
  
//           const response = await axios.post('http://localhost:3000/api/match', applicationIdOfUnmatchUsers);
//           console.log("user from db " + JSON.stringify(response.data.user));
//           setUserData(response.data.user);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };
  
//     fetchData();
//   }, [userId]);
  


//   try {
//     const user = await getUser();
//     console.log("this is user id im printing"+user?.id);
//     // const allMatch = await getAllMatched(user?.id as string);
//     // console.log(allMatch);

//     if (user) {
//       const dbUser = await getUserById(user.id);
//       console.log(dbUser);

//       if (dbUser === null) {
//         await createUser({
//           applicationId: user.id,
//           email: user.email || "dumyy@mail.com",
//           firstname: user.given_name || "john",
//           lastname: user.family_name || "doe",
//         });
//       }
//     }
//     setUserId(userId);

//   } catch (error) {
//     console.error("Error processing user:", error);
//   }
//   const user = await getUser();
//   const me = await getUserById(user?.id as string);



//   return (
//     <div className="bg-rpink">
//       {/* <HomePage currentUser={me} users={userWithNoConnection || []} /> */}
//       {/* <ThreeDCardDemo currentUser={me} users={userWithNoConnection || []} /> */}
//     </div>
//   );
// }

// export default Page;
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page