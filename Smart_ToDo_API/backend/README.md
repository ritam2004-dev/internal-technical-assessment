# Smart ToDo API

A RESTful backend application for managing personal tasks with secure user authentication.  
This project is built using Node.js, Express, and MongoDB, following industry-standard REST API design principles.

---

## 🧪 API Testing

A complete Postman collection is provided.

📄 File:

```
docs/Smart_ToDo_API_Postman_Collection.json
```

### Steps:

1. Open Postman
2. Import the collection
3. Run Register/Login
4. Test protected routes (cookies handled automatically)
5. Fill task id in variable in postman for update/delete

🔗 Link to import:

```
 https://www.postman.com/aviation-physicist-83449710/workspace/smart-todo-api/collection/28913218-5f25f607-0a2c-4158-bc4d-2558e685d9f1?action=share&creator=28913218
```

### Steps:

1. Open the Collection
   - Click on the Postman link above
   - Open it in your browser or directly in the Postman desktop application
2. Fork or Import the Collection
   You can use **either** method:
   - Option A: Fork (Recommended)
     - Click **Fork** (top-right)
     - Select your workspace
     - Save the forked collection
   - Option B: Import
     - Copy the collection URL
     - Open Postman → **Import**
     - Choose **Link**
     - Paste the URL and import
3. Run Register/Login
4. Test protected routes (cookies handled automatically)
5. Fill task id in variable in postman for update/delete

---

## 📝 Task API Usage Notes (IMPORTANT)

### ⚠️ TASK_ID Must Be Added Manually

For **Update Task** and **Delete Task** requests, a task ID is required.

#### How to set `TASK_ID`:

1. Run **Create Task** or **Get Tasks**
2. Copy the `_id` of any task from the response
3. In Postman:
   - Go to the **Variables** section of the collection
   - Paste the copied value into:
     ```
     TASK_ID
     ```
4. Save the variable
5. Now run **Update Task** or **Delete Task**

> ❗ If `TASK_ID` is not set, update and delete requests will fail.

---

## 🚀 Features

- User Registration & Login
- JWT-based Authentication (stored in httpOnly cookies)
- Create, Read, Update, Delete (CRUD) Tasks
- User-specific task access (authorization enforced)
- RESTful API with versioning (`/api/v1`)
- Postman collection for easy API testing

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + Cookies
- **Testing & Docs**: Postman
- **Other Tools**: dotenv, cookie-parser, bcryptjs, cors

---

## 📁 Project Structure

```
smart-todo-api/
│
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── User.model.js
│   └── Task.model.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── docs/
│   ├── API_ROUTES.md
│   └── Smart_ToDo_API_Postman_Collection.json
├── index.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_todo
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

## ▶️ Getting Started

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Run the Server

```
npm run dev
```

Server will start on:

```
http://localhost:5000
```

---

## 🔐 Authentication Flow

- User logs in or registers
- JWT is generated and stored in an **httpOnly cookie**
- Cookie is automatically sent with every request
- `authMiddleware` verifies the token and attaches `req.userId`

---

## 📌 API Endpoints

### Auth Routes (`/api/v1/auth`)

- `POST /register` – Register a user
- `POST /login` – Login user
- `POST /logout` – Logout user
- `GET /me` – Get current user

### Task Routes (`/api/v1/tasks`) _(Protected)_

- `POST /` – Create task
- `GET /` – Get all tasks
- `PUT /:id` – Update task
- `DELETE /:id` – Delete task

---

## 🩺 Health Check

```
GET /
```

Response:

```
Smart ToDo API is running
```

---

## 👤 Author

**Amarnath Kumar**
