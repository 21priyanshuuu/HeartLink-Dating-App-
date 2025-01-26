// pages/api/submitForm.ts
import dbConnect  from "../../../dbConnect/mongoConnect";
import UserModel from "../../../types/profileSchema";

export  async function POST(req, res) {
    try {
      const { 
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
        isUpdated } =await req.json();

        const existingUser = await UserModel.findOne({ applicationId });

        if (existingUser) {
          return Response.json(
            { error: "User with this applicationId already exists!" },
            { status: 400 }
          );
        }

      await dbConnect();

      const newUser = new UserModel({
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
        createdAt: new Date(),
      });

      const savedUser = await newUser.save();
      return Response.json(
        { messages: "Form submitted successfully!" },
        {
          status: 200,
        }
      );

    } catch (error) {
      console.error("Error saving form data:", error);
      return Response.json({ error: "Internal server error" });
    }
  
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return Response.json(
        { messages: "applicationId is required!" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await UserModel.findOne({ applicationId });

    if (!existingUser) {
      return Response.json(
        { messages: "User with this applicationId doesn't exist!" },
        { status: 400 }
      );
    }

    return Response.json({ exists: true, user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
