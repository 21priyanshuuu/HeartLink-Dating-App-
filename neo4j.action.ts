"use server";
import { driver } from "@/dbConnect";
import { Neo4JUser } from "@/types";

export const getUserById = async (id: string) => {
  console.log("get user by id method called!!!!!!");
  try {
    const result = await driver.executeQuery(
      `MATCH (u:User {applicationId: $applicationId}) RETURN u`,
      { applicationId: id }
    );
    const user = result.records.map((record) => record.get("u").properties);
    if (user.length === 0) return null;
    return user[0] as Neo4JUser;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const createUser = async (user: Neo4JUser) => {
  console.log("create user method called!!!!!!");
  const { applicationId, email, firstname, lastname } = user;
  console.log(applicationId, email, firstname, lastname);

  try {
    const result = await driver.executeQuery(
      `CREATE (u:User {applicationId: $applicationId, email: $email, firstname: $firstname, lastname: $lastname}) RETURN u`,
      { applicationId, email, firstname, lastname }
    );
    console.log(result);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserWithNoConnection = async (
  id: string
): Promise<Neo4JUser[]> => {
  try {
    const result = await driver.executeQuery(
      `MATCH (cu:User {applicationId: $applicationId}) 
         MATCH (ou:User) 
         WHERE NOT (cu)-[:LIKE|:DISLIKE]->(ou) AND cu <> ou 
         RETURN ou`,
      { applicationId: id }
    );

    const users = result.records.map((record) => record.get("ou").properties);
    return users as Neo4JUser[];
  } catch (error) {
    console.error("Error getting users with no connection:", error);
    throw error;
  }
};
export const neo4jSwipe = async (
  id: string,
  swipe: string,
  userId: string
): Promise<boolean> => {
  const type = swipe === "left" ? "DISLIKE" : "LIKE";
  await driver.executeQuery(
    `MATCH (cu :User{applicationId:$id}),(ou:User {applicationId:$userId}) CREATE (cu)-[:${type}]->(ou)`,
    {
      id,
      userId,
    }
  );
  if (type === "LIKE") {
    const result = await driver.executeQuery(
      `MATCH (cu:User {applicationId:$id}),(ou:User{applicationId:$userId}) WHERE (ou)-[:LIKE]->(cu) RETURN ou as match`,
      {
        id,
        userId,
      }
    );
    console.log(result);
    const matches = result.records.map(
      (record) => record.get("match").properties
    );
    return Boolean(matches.length > 0);
  }
};

export const getAllMatched = async (id: string): Promise<Neo4JUser[]> => {
  console.log("get all matched users method called!!!!!!");
  try {
    const result = await driver.executeQuery(
      `MATCH (cu:User {applicationId: $applicationId})-[:LIKE]->(ou:User)
       WHERE (ou)-[:LIKE]->(cu)
       RETURN ou`,
      { applicationId: id }
    );
    const matchedUsers = result.records.map(
      (record) => record.get("ou").properties
    );
    return matchedUsers as Neo4JUser[];
  } catch (error) {
    console.error("Error getting matched users:", error);
    throw error;
  }
};
export const deleteUser = async (id: string) => {
  console.log("delete user method called!!!!!!");
  if (!driver) {
    throw new Error("Neo4j driver is not initialized");
  }

  try {
    const result = await driver.executeQuery(
      `MATCH (u:User {applicationId: $applicationId}) DETACH DELETE u RETURN u`,
      { applicationId: id }
    );
    console.log(`User with applicationId ${id} deleted successfully`);
    return result.records.length > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const addUserImage = async (id: string, imageUrl: string) => {
  console.log("add user image method called!!!!!!");
  if (!driver) {
    throw new Error("Neo4j driver is not initialized");
  }

  try {
    const result = await driver.executeQuery(
      `MATCH (u:User {applicationId: $applicationId}) 
       SET u.imageUrl = $imageUrl 
       RETURN u`,
      { applicationId: id, imageUrl }
    );
    console.log(
      `Image URL added to user with applicationId ${id} successfully`
    );
    const updatedUser = result.records.map(
      (record) => record.get("u").properties
    );
    return updatedUser.length > 0 ? updatedUser[0] : null;
  } catch (error) {
    console.error("Error adding user image:", error);
    throw error;
  }
};
