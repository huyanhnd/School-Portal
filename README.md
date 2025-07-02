# School Portal

A full-stack web application to manage teachers and classes in a primary school setting.

---

## 🌌 Deployed Demo

* 🔗 **Frontend (React App)**:
  [https://school-portal-tau-vert.vercel.app/](https://school-portal-tau-vert.vercel.app/)

* 📊 **API Documentation (Swagger UI)**:
  [https://school-portal-production-eed8.up.railway.app/api-docs](https://school-portal-production-eed8.up.railway.app/api-docs)

---

## 📊 Tech Stack

* **Frontend**: React + TypeScript + Ant Design
* **Backend**: Node.js + Express + TypeScript + Sequelize
* **Database**: PostgreSQL
* **API Documentation**: Swagger UI

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js >= 18
* npm or yarn
* PostgreSQL

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd ../frontend
npm install
```

### 3. Start PostgreSQL

* **macOS (Homebrew)**:

```bash
brew services start postgresql
```

* **Ubuntu/Linux**:

```bash
sudo service postgresql start
```

### 4. Setup database

Open the `.env` file inside `backend` folder and fill in database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_portal
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
```

Create the database:

```bash
createdb school_portal
```

### 5. Run the backend

```bash
cd backend
npm run dev
```

* Runs on: `http://localhost:3001`
* Swagger: `http://localhost:3001/api-docs`

### 6. Run the frontend

```bash
cd frontend
npm start
```

* Runs on: `http://localhost:3000`

---

## 📁 Folder Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── app.ts
│   └── swagger/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── utils/
│   └── index.tsx
```

---

## 📐 Assumptions

* No authentication or user roles implemented (public access).
* Teachers are uniquely identified by their email addresses.
* A teacher can only be the form teacher of **one** class.
* The frontend uses static routing via `react-router-dom`.
* PostgreSQL is used as the relational database.

---

## ✅ Features

* Add and view list of teachers
* Add and view list of classes
* Assign teacher to a class (one-to-one relationship)
* Field validation on both frontend and backend
* Simple, responsive UI built with Ant Design
* Interactive Swagger UI for exploring API endpoints

---

## 🔍 API Overview

### Teachers

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| POST   | `/api/teachers` | Create a new teacher      |
| GET    | `/api/teachers` | Retrieve list of teachers |

### Classes

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/api/classes` | Create a new class       |
| GET    | `/api/classes` | Retrieve list of classes |

---

## 🔧 API Design Inputs / Suggestions

### 1. Register a Teacher

* **Endpoint**: `POST /api/teachers`
* **Headers**: `Content-Type: application/json`
* **Success Response**: HTTP 201
* **Body Example**:

```json
{
  "name": "Mary",
  "subject": "Mathematics",
  "email": "teachermary@gmail.com",
  "contactNumber": "68129414"
}
```

---

### 2. Retrieve Teacher List

* **Endpoint**: `GET /api/teachers`
* **Success Response**: HTTP 200
* **Response Example**:

```json
{
  "data": [
    {
      "name": "Mary",
      "subject": "Mathematics",
      "email": "teachermary@gmail.com",
      "contactNumber": "68129414"
    },
    {
      "name": "Ken",
      "subject": "Mother Tongue Language",
      "email": "teacherken@gmail.com",
      "contactNumber": "61824191"
    }
  ]
}
```

---

### 3. Add a Class with Form Teacher

> Note: A teacher can only be the form teacher of **one** class.

* **Endpoint**: `POST /api/classes`
* **Headers**: `Content-Type: application/json`
* **Success Response**: HTTP 201
* **Body Example**:

```json
{
  "level": "Primary 1",
  "name": "Class 1A",
  "teacherEmail": "teachermary@gmail.com"
}
```

---

### 4. Retrieve Class List

* **Endpoint**: `GET /api/classes`
* **Success Response**: HTTP 200
* **Response Example**:

```json
{
  "data": [
    {
      "level": "Primary 1",
      "name": "Class 1A",
      "formTeacher": {
        "name": "Mary"
      }
    },
    {
      "level": "Primary 2",
      "name": "Class 2B",
      "formTeacher": {
        "name": "Ken"
      }
    }
  ]
}
```

---

### ⚠️ Error Handling

All error responses should:

* Use appropriate HTTP status codes (e.g. `400`)
* Return a JSON body with error message:

```json
{ "error": "Some meaningful error message" }
```
