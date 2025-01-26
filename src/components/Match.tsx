"use client";
import { Neo4JUser } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MatchProps {
  users: Neo4JUser[];
  currentUser: Neo4JUser | null;
}

const Match: React.FC<MatchProps> = ({ users, currentUser }) => {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center bg-openmai-bg">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="w-96 max-w-xs mx-auto" key={user.applicationId}>
              <Card className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                <CardHeader>
                  <CardTitle>
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardContent>
                    <img
                      className="h-40 object-cover rounded-xl"
                      src={`https://robohash.org/${user.applicationId}?set=set5`}
                      alt="Dummy Image"
                    />
                  </CardContent>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-white">No matches found</p>
        )}
      </div>
    </div>
  );
};

export default Match;