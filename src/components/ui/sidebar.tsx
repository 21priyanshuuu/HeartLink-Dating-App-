"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Font, {Text} from 'react-font'


export function Sidebar() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const router = useRouter();

  // List of navigation buttons
  const navButtons = [
    { label: "Home", onClick: () => router.push("/") },
    { label: "Profile", onClick: () => router.push("/profile") },
    { label: "Find Someone", onClick: () => router.push("/opemai") },
    { label: "Match", onClick: () => router.push("/match") },
    { label: "Messages", onClick: () => router.push("/message") },
    { label: "Logout", onClick: () => <LogoutLink>Log out</LogoutLink> },


  ];

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-sidebarbg text-white flex flex-col justify-between transition-all duration-300",
        isSidebarMinimized ? "w-13" : "w-64" 
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center space-x-2 px-9 py-4">
        <Image src="/images/logo.png" alt="Logo" width={25} height={25} />
        {!isSidebarMinimized && (
          <h1 className="text-2xl font-bold text-center">HeartLink</h1>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 absolute top-3 right-5"
      >
        {isSidebarMinimized ? ">" : "<"}
      </button>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 p-4 text-bold">
        {navButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className="p-3 text-left rounded-md hover:bg-gray-700 transition"
          >
            {!isSidebarMinimized && button.label}
          </button>
             

        ))}
        

      </div>

      {/* User Button */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-md bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
          {/* <img
            src="/user-avatar.png" // Replace with your avatar URL
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          /> */}
          {!isSidebarMinimized && (
            <div>
              <p className="font-semibold">Priyanshu Singh</p>
              <p className="text-sm text-gray-400">Profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
