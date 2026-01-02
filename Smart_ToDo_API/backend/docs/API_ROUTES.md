# Smart ToDo API – Route Documentation

## Base URL

```
http://localhost:5000
```

All API routes are prefixed with:

```
/api/v1
```

---

## 🔐 Authentication Routes

Base Path:

```
/api/v1/auth
```

| Method | Endpoint    | Description                | Auth Required |
| ------ | ----------- | -------------------------- | ------------- |
| POST   | `/register` | Register a new user        | ❌            |
| POST   | `/login`    | Login user                 | ❌            |
| POST   | `/logout`   | Logout user                | ✅            |
| GET    | `/me`       | Get logged-in user details | ✅            |

### Example

```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

Authentication is handled using **JWT stored in httpOnly cookies**.

---

## 📝 Task Routes

Base Path:

```
/api/v1/tasks
```

> All task routes are **protected** and require authentication.

| Method | Endpoint | Description                      |
| ------ | -------- | -------------------------------- |
| POST   | `/`      | Create a new task                |
| GET    | `/`      | Get all tasks for logged-in user |
| PUT    | `/:id`   | Update a specific task           |
| DELETE | `/:id`   | Delete a specific task           |

### Example

```
POST   /api/v1/tasks
GET    /api/v1/tasks
PUT    /api/v1/tasks/65a20d91f5...
DELETE /api/v1/tasks/65a20d91f5...
```

---

## 🩺 Health Check Route

```
GET /
```

### Response

```
Smart ToDo API is running
```

Used to verify that the server is up and running.

---
