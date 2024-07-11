import "server-only";
import neo4j, { Driver } from "neo4j-driver";

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USERNAME;
const PASSWORD = process.env.NEO4J_PASSWORD;

let driver: Driver;

try {
  driver = neo4j.driver(
    URI as string,
    neo4j.auth.basic(USER as string, PASSWORD as string)
  );
  console.log("Neo4j driver created successfully");
} catch (error) {
  console.error("Error creating Neo4j driver:", error);
}

export { driver };
