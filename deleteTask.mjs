

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "us-east-1";
const client = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const taskId = event.pathParameters?.taskId;

  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: "Tasks",
        Key: { taskId }
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,DELETE"
      },
      body: JSON.stringify({ message: "Task deleted" })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: "Internal server error",
        error: err.message
      })
    };
  }
};
