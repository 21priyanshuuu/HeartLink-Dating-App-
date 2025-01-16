"use client";
"use client";
import { Neo4JUser } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import TinderCard from "react-tinder-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createUser,
  getUserById,
  getUserWithNoConnection,
  neo4jSwipe,
} from "../../neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface HomePageProps {
  currentUser: Neo4JUser | null;
  users: Neo4JUser[];
}

const HomePage: React.FC<HomePageProps> = ({ currentUser, users }) => {
  const { toast } = useToast();

  const handleSwipe = async (direction: string, userId: string) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "No user is currently logged in.",
      });
      return;
    }
  
    const isMatch = await neo4jSwipe(currentUser.applicationId, direction, userId);
    console.log("swiped")
    if (isMatch) {
      toast({
        title: "Match",
        description: "Congratulations! It's a Match!!!!",
      });
    }
  };
  

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div>
      <div className="relative w-full h-screen flex justify-center items-center">
        {users.length > 0 ? (
          users.map((user, index) => (
            <TinderCard
              key={user.applicationId}
              onSwipe={(direction) =>
                handleSwipe(direction, user.applicationId)
              }
              onCardLeftScreen={() => onCardLeftScreen(user.applicationId)}
              className={`absolute z-${users.length - index}`}
            >
              <div className="relative w-110 max-w-xs mx-auto">
                <Card className="w-70 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
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

                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <button
                        className="text-white bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500"
                        onClick={async () =>
                          await handleSwipe("left", user.applicationId)
                        }
                      >
                        Left
                      </button>
                      <button
                        className="text-white bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500"
                        onClick={async () =>
                          await handleSwipe("right", user.applicationId)
                        }
                      >
                        Right
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TinderCard>
          ))
        ) : (
          <p>No users found with no connection.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
