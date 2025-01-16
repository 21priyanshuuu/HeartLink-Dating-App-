// src/components/UploadImage.tsx
"use client";

import { UploadButton } from "../../utils/uploadthing";
import { useState, useEffect } from "react";
import Image from "next/image";
import { addUserImage } from "../../../neo4j.action";

export default function UploadImage() {
  const [imageurl, setimageurl] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user", data.error);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          <p>User ID: {user.id}</p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setimageurl(res[0].url);
              console.log(res[0].url);
              addUserImage(user.id, res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />

          {imageurl && (
            <div>
              <Image src={imageurl} alt="my-image" width={500} height={500} />
            </div>
          )}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </main>
  );
}
