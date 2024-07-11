"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/logo.png";
import { TfiMenu } from "react-icons/tfi";
import { FaUserAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Navbars = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full h-12 bg-pink-500 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={80} height={80} />
        <span className="self-center font-semibold ml-2">HeartLink</span>
      </div>
      <div className="flex space-x-4 items-center">
        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/")}
        >
          <FaUserAlt />
          <span className="text-xs">Profile</span>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/callback")}
        >
          <TfiMenu />
          <span className="text-xs">Menu</span>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => handleNavigation("/match")}
        >
          <FaHeart />
          <span className="text-xs">Favorites</span>
        </button>
        <LogoutLink className="flex flex-col items-center text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
          <span>Logout</span>
        </LogoutLink>
      </div>
    </div>
  );
};

export default Navbars;
