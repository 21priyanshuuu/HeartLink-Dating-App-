"use client";
import React, { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserWithNoConnection } from "../../../neo4j.action";
import axios from "axios";
import {ThreeDCardDemo} from "../../components/cardAsc"

const Page = () => {
  const [userId, setUserId] = useState('');
  const { user } = useKindeBrowserClient();
  const [userData,setUserData]=useState([])

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]); 
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const userWithNoConnection = await getUserWithNoConnection(userId);
          const applicationIdOfUnmatchUsers = userWithNoConnection.map(
            (user) => user.applicationId
          );
          console.log(applicationIdOfUnmatchUsers);  
          const response = await axios.post('api/match', applicationIdOfUnmatchUsers);
          console.log("user from db " + JSON.stringify(response.data.user));
          setUserData(response.data.user);
          console.log(typeof(userData))
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [userId]); 

  return <div className="bg-openmai-bg">
    
          <ThreeDCardDemo currentUser={userId} users={userData} />

  </div>;
};

export default Page;
