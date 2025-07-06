// index.mjs for updateTask

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.AWS_REGION || "us-east-1";
const client = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const taskId = event.pathParameters.taskId;

  if (!taskId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing taskId in path" }),
    };
  }

  const body = JSON.parse(event.body);

  try {
    await dynamo.send(
      new UpdateCommand({
        TableName: "Tasks",
        Key: { taskId },
        UpdateExpression:
          "SET #title = :title, #description = :description, #status = :status, #priority = :priority, #dueDate = :dueDate",
        ExpressionAttributeNames: {
          "#title": "title",
          "#description": "description",
          "#status": "status",
          "#priority": "priority",
          "#dueDate": "dueDate",
        },
        ExpressionAttributeValues: {
          ":title": body.title,
          ":description": body.description,
          ":status": body.status,
          ":priority": body.priority,
          ":dueDate": body.dueDate,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,PUT",
      },
      body: JSON.stringify({ message: "Task updated successfully" }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,PUT",
      },
      body: JSON.stringify({
        message: "Internal server error",
        error: err.message,
      }),
    };
  }
};
