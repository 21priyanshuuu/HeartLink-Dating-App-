import { NextResponse } from "next/server";
import UserModel from "@/types/profileSchema";
import dbConnect from "../../../dbConnect/mongoConnect"

export  async function POST(req){
    await dbConnect();
    let data;
    try {
         data = await req.json();
        console.log("printing from route "+data);
        const result = await UserModel.find({
            applicationId: { $in: data }
      
          });
        const userList=result.map((user)=>({
            applicationId: user.applicationId,
            name: user.name,
            age: user.age,
            gender: user.gender,
            interestedGender: user.interestedGender,
            profession: user.profession,
            bio: user.bio,
            imageUrls: [user.imageurl1, user.imageurl2],
            interests: user.interests,
            selectedPrompt: user.selectedPrompt,
            answer: user.answer
        }));
          return NextResponse.json({
            message: 'User found',
            user: userList,  
          });    
    } catch (error) {
        console.error(error);
    }
}
