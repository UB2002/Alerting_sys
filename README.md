# Alerting System for Monitoring Failed POST Requests

## Project Overview
This backend system monitors a specific POST endpoint (`/api/submit`) for failed requests caused by invalid headers or an incorrect access token. It tracks and logs failed attempts, triggers email alerts when thresholds are exceeded, and provides an endpoint to fetch metrics for further analysis. 

## Features
- Monitors failed POST requests.
- Tracks failed attempts by IP within a configurable time window (e.g., 10 minutes).
- Sends email alerts when a threshold (e.g., 5 attempts) is breached.
- Logs source IP, timestamp, and reason for failure.
- Exposed two endpoint to fetch metrics.
---

## Tech Stack
- **Backend Language:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Email Service:** Google SMTP

---

## Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download here](https://nodejs.org/)
- **MongoDB**: Set up a MongoDB instance locally or on a cloud provider (e.g., MongoDB Atlas).
- **SMTP Access**: A valid Gmail account with App Passwords enabled.

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UB2002/Alerting_sys.git
   cd Alerting_sys
   ```
2. **Install dependencies:**

  ``` bash
  npm install
  ```
3. **Set up environment variables:**
Create a .env file in the root directory.
Copy the content from .env.example and replace placeholders with actual values
```bash
PORT=3000
DB_URI=mongodb://localhost:27017/mydatabase
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
```
4. **Run the application:**

```bash
npm start
```
### The server will start on the specified PORT (default: 3000).
---
## API Endpoints
1. **POST /api/submit :**
   <br>Description: Validates the request and logs failures caused by invalid headers or tokens.
   <br>Headers Required:
   ```bash
   access-token: Valid token.
   ```
   Responses:
   <br>**200 OK: Request succeeded.**
   <br>**401 Unauthorized: Invalid token or headers**
3. **Get /api/metrices :**
    <br>Description: Fetches logged metrics for failed requests.
    * Response:
``` bash
[
  {
    "sourceIP": "192.168.0.1",
    "timestamp": "2025-01-01T12:00:00Z",
    "reason": "Invalid token"
  }
]
```
