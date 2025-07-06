

# 📋 Task Manager

A simple, serverless task management application built using AWS services and deployed to the AWS Free Tier.

---

## 🌐 Deployed Link

[View the Live Application](http://taskmana.s3-website-us-east-1.amazonaws.com)

---

## ⚙️ Tech Stack & AWS Services Used

This project uses the following technologies and AWS services:

### ✅ **Frontend**

* **HTML5** — Structure of the web pages.
* **Tailwind CSS** — Modern, utility-first CSS framework for styling.
* **Vanilla JavaScript** — Handles API calls, DOM manipulation, and interactivity.
* **Hosted on Amazon S3** — Static website hosting.
* **Delivered via CloudFront** *(optional)* — For better performance and HTTPS.

### ✅ **Authentication**

* *Planned for future*: Amazon Cognito *(optional)* — Secure sign-up/sign-in (not included in the current version).

### ✅ **Backend (Serverless)**

* **AWS Lambda** — Executes serverless backend functions:

  * `getTasks` (GET)
  * `createTask` (POST)
  * `updateTask` (PUT)
  * `deleteTask` (DELETE)

* **API Gateway (REST API)** — Provides RESTful endpoints with CORS configuration to invoke Lambda functions securely.

* **DynamoDB** — NoSQL database to store tasks:

  * Primary Key: `taskId`
  * Attributes: `title`, `description`, `status`, `priority`, `dueDate`
  * *Optional*: Global Secondary Index (GSI) for querying status/priority.

### ✅ **Other AWS Services**

* **IAM Roles & Policies** — Secure permissions for Lambda functions to access DynamoDB.
* **CloudWatch Logs** — Monitors and debugs Lambda invocations.
* **S3 Bucket Policy & CORS** — Allows the frontend to communicate with the backend securely.

---

## 📌 Deployed Architecture

```
[ User Browser ]
      ↓
[ S3 Hosted Frontend (HTML, CSS, JS) ]
      ↓
[ API Gateway (CORS Enabled) ]
      ↓
[ AWS Lambda Functions ]
      ↓
[ DynamoDB Table: Tasks ]
```

**🚀 [Try it here!](http://taskmana.s3-website-us-east-1.amazonaws.com)**

---
