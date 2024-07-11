"use client";
import { Neo4JUser } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HomePageProps {
  users: Neo4JUser[];
}
const HomePage: React.FC<HomePageProps> = ({ users }) => {
  return (
    <div>
      <div className=" w-full h-screen flex justify-center items-center  bg-gradient-to-r from-amber-300 to-orange-400">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div className="w-96 max-w-xs mx-auto" key={user.applicationId}>
              <Card className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                <CardHeader>
                  <CardTitle>
                    <div></div>
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardContent>
                    {user.imageUrl ? (
                      <img
                        className="h-40 object-cover rounded-xl"
                        src={user.imageUrl}
                        alt="User Image"
                      />
                    ) : (
                      <img
                        className="h-40 object-cover rounded-xl"
                        src={`https://robohash.org/${user.applicationId}?set=set5`}
                        alt="Dummy Image"
                      />
                    )}
                  </CardContent>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <p>No users found with no connection.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
