"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { UploadButton } from "../../utils/uploadthing";
import axios from "axios";

export default function SignupFormDemo() {
  const [name, setName] = useState<string>("");
  const [imageurl1, setimageurl1] = useState<string>("");
  const [imageurl2, setimageurl2] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [interestedGender, setInterestedGender] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [smoking, setSmoking] = useState<string>("");
  const [drinking, setDrinking] = useState<string>("");
  const [interests, setInterests] = useState({
    movie: false,
    music: false,
    hiking: false,
    reading: false,
    fitness: false,
  });
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [applicationId, setUser] = useState<any>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null); 


  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if (response.ok) {
          setUser(data.user.id);
        } else {
          console.error("Failed to fetch user", data.error);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    }

    fetchUser();
  }, []);

  const handleInterestChange = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    setInterests((prevInterests) => ({
      ...prevInterests,
      [name]: checked,
    }));
  };
  const checkExistingUser = async () => {
    try {
      const response = await axios.get("/api/profile", {
        params: { applicationId }, 
      });

      if (response.data.exists) {
        setUserExists(true);
        console.log("Existing user found:", response.data.user);
      }else setUserExists(false);
    } catch (error: any) {
      console.error("Error checking existing user:", error.response || error);
    }
    
  };    
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUpdated = true;
    const userData = {
      name,
      imageurl1,
      imageurl2,
      age,
      gender,
      interestedGender,
      bio,
      profession,
      smoking,
      drinking,
      interests,
      selectedPrompt,
      answer,
      applicationId,
      isUpdated,
    };
    console.log("this is name" + name);
    console.log(userData);

    try {
      const response = await axios.post("/api/profile", userData, {
        headers: {
          "Content-Type": "application/json", 
        },
      });

      console.log("Profile saved:", response.data);
    } catch (error: any) {
      console.error("Error submitting the form:", error.response || error);
    }
  };
  useEffect(() => {
    if (applicationId) {
      checkExistingUser();
    }
  }, [applicationId]);

  if (userExists === true) {
    return <div className="p-32">User exists</div>;
  }
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to HeartLink
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Join HeartLink to find your perfect match.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Enter Name</Label>
            <Input
              id="firstname"
              placeholder="First Name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="Age"
            type="number"
            required
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            className="border bg-gray-100 rounded-md h-10 px-3"
            onChange={(e) => setGender(e.target.value)} 
            value={gender}
          >
             <option value="" disabled>
              -- Choose a prompt --
            </option>
            <option value="preferNotToSay">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-Binary</option>
          </select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="interestedIn">Interested In</Label>
          <select
            id="interestedIn"
            className="border rounded-md h-10 px-3 bg-gray-100"
            onChange={(e) => setInterestedGender(e.target.value)} // Directly update the state here
            value={interestedGender} // Bind the state to the select element
          >
            <option value="everyone">Everyone</option>
            <option value="male">Men</option>
            <option value="female">Women</option>
          </select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="bio">Bio/About Me</Label>
          <Input
            id="bio"
            type="text"
            required
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            placeholder="e.g., Software Engineer"
            type="text"
            onChange={(e) => setProfession(e.target.value)}
            value={profession}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="interests">Interests</Label>
          <div className="flex flex-col m-5">
            <label>
              <input
                type="checkbox"
                name="movie"
                checked={interests.movie}
                onChange={handleInterestChange}
              />
              Movie
            </label>
            <label>
              <input
                type="checkbox"
                name="music"
                checked={interests.music}
                onChange={handleInterestChange}
              />
              Music
            </label>
            <label>
              <input
                type="checkbox"
                name="hiking"
                checked={interests.hiking}
                onChange={handleInterestChange}
              />
              Hiking
            </label>
            <label>
              <input
                type="checkbox"
                name="reading"
                checked={interests.reading}
                onChange={handleInterestChange}
              />
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                name="fitness"
                checked={interests.fitness}
                onChange={handleInterestChange}
              />
              Fitness
            </label>
          </div>
        </LabelInputContainer>

        <div className="mb-4">
          <label htmlFor="prompt" className="block font-medium mb-2">
            Select a Prompt
          </label>
          <select
            id="prompt"
            className="border bg-gray-100 rounded-md h-10 px-3 w-full"
            onChange={(e) => setSelectedPrompt(e.target.value)}
            value={selectedPrompt || ""}
          >
            <option value="" disabled>
              -- Choose a prompt --
            </option>
            <option value="What motivates you the most?">
              What motivates you the most?
            </option>
            <option value="Describe your ideal work environment">
              Describe your ideal work environment.
            </option>
            <option value="What are your long-term goals?">
              What are your long-term goals?
            </option>
            <option value="Share a personal success story">
              Share a personal success story.
            </option>
          </select>

          <label htmlFor="answer" className="block font-medium mt-4 mb-2">
            Your Answer
          </label>
          <textarea
            id="answer"
            className="border rounded-md px-3 py-2 w-full bg-gray-100"
            rows={4}
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
        </div>

        {/* Lifestyle */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="smoking">Smoking Habit</Label>
          <select
            id="smoking"
            className="border rounded-md h-10 px-3 bg-gray-100"
            onChange={(e) => setSmoking(e.target.value)}
            value={smoking}
          >
            <option value="" disabled>
              -- Choose a prompt --
            </option>
            <option value="nonSmoker">Non-Smoker</option>
            <option value="socialSmoker">Social Smoker</option>
            <option value="regularSmoker">Regular Smoker</option>
          </select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="drinking">Drinking Habit</Label>
          <select
            id="drinking"
            className="border rounded-md h-10 px-3 bg-gray-100"
            onChange={(e) => setDrinking(e.target.value)}
            value={drinking}
          >
            <option value="" disabled>
              -- Choose a prompt --
            </option>
            <option value="nonDrinker">Non-Drinker</option>
            <option value="socialDrinker">Social Drinker</option>
            <option value="regularDrinker">Regular Drinker</option>
          </select>
        </LabelInputContainer>

        {/* Contact Information */}

        <LabelInputContainer>
          <Label htmlFor="password">Upload minimum 2 photos</Label>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setimageurl1(res[0].url);
              console.log(res[0].url);
              // addUserImage(user.id, res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setimageurl2(res[0].url);
              console.log(res[0].url);
              // addUserImage(user.id, res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Update &rarr;
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
