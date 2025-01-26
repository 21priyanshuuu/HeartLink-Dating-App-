"use client";

import Image from "next/image";
import { neo4jSwipe } from "../../neo4j.action";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useToast } from "@/components/ui/use-toast";
import { FaMusic, FaHiking, FaFilm, FaBook, FaDumbbell } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";

interface singles {
  applicationId: string;
  name: string;
  age: string;
  gender: string;
  interestedGender: string;
  profession: string;
  bio: string;
  imageUrls: string[];
  interests: {
    movie: boolean;
    music: boolean;
    hiking: boolean;
    reading: boolean;
    fitness: boolean;
  };
  selectedPrompt: string;
  answer: string;
}

interface HomePageProps {
  currentUser: string;
  users: singles[];
}

export function ThreeDCardDemo({ currentUser, users }: HomePageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const handleSwipe = async (direction: string, userId: string) => {
    console.log(
      `${direction} swipe for user ID: ${users[currentIndex].applicationId}`
    );
    if (!currentUser) {
      toast({
        title: "Error",
        description: "No user is currently logged in.",
      });
      return;
    }
    const isMatch = await neo4jSwipe(currentUser, direction, userId);
    if (isMatch) {
      toast({
        title: "Match",
        description: "Congratulations! It's a Match!!!!",
      });
    }

    // Show the next card by updating the index
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(-1);
      console.log("No more users!");
    }
  };

  if (!users || users.length === 0) {
    return (
      <p className="text-center text-neutral-500 text-lg p-10">
        No users available.
      </p>
    );
  }

  const user = users[currentIndex]; // Get the current user to display

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <CardContainer className="inter-var">
        <CardBody className="bg-yyellow relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[40rem] h-auto rounded-xl p-8 border">
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-neutral-600 dark:text-white"
          >
            {user.name}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-6">
            <Image
              src={user.imageUrls[1]}
              height={1000}
              width={1000}
              className="h-72 object-cover rounded-xl group-hover/card:shadow-xl"
              alt="User Avatar"
            />
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>Age:  {user.age} </strong>
           
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>Gender: </strong>
            {user.gender == "male" ? (
             <strong> <IoMdMale size={32} />male</strong>
            ) : (
              <strong> <IoMdFemale size={32} />Female</strong>
            )}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>Interested in: </strong>
            {user.interestedGender}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>Profession: </strong>
            {user.profession}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>Bio: </strong>
            {user.bio}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-6">
            <Image
              src={user.imageUrls[0]}
              height={1000}
              width={1000}
              className="h-72 object-cover rounded-xl group-hover/card:shadow-xl"
              alt="User Avatar"
            />
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300"
          >
            <strong>{user.selectedPrompt}</strong>
          </CardItem>
          <div className="border-black">
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-base max-w-lg mt-4 dark:text-neutral-300 "
          >
            <strong>  {user.answer} </strong>
          
          </CardItem>
          </div>
         

          {/* Displaying Interests */}
          <div className="mt-4 flex gap-4">
            <strong>{user.name} Loves</strong>
            {user.interests.movie && (
              <div className="flex items-center">
                <FaFilm className="mr-2 text-lg" />
                <span>Movies</span>
              </div>
            )}
            {user.interests.music && (
              <div className="flex items-center">
                <FaMusic className="mr-2 text-lg" />
                <span>Music</span>
              </div>
            )}
            {user.interests.hiking && (
              <div className="flex items-center">
                <FaHiking className="mr-2 text-lg" />
                <span>Hiking</span>
              </div>
            )}
            {user.interests.reading && (
              <div className="flex items-center">
                <FaBook className="mr-2 text-lg" />
                <span>Reading</span>
              </div>
            )}
            {user.interests.fitness && (
              <div className="flex items-center">
                <FaDumbbell className="mr-2 text-lg" />
                <span>Fitness</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => handleSwipe("left", user.applicationId)}
              className="px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600"
            >
              Left
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => handleSwipe("right", user.applicationId)}
              className="px-6 py-3 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600"
            >
              Right
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
