# School Portal

A full-stack web application to manage teachers and classes in a primary school setting.

## 🧱 Tech Stack

- **Frontend**: React + TypeScript + Ant Design
- **Backend**: Node.js + Express + TypeScript + Sequelize
- **Database**: PostgreSQL
- **API Documentation**: Swagger UI

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL

---

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

### 3. Start PostgreSQL (if not already)

- **Windows**: PostgreSQL usually runs as a service after installation — no manual command needed.
- **macOS** (Homebrew):

```bash
brew services start postgresql
```

- **Ubuntu/Linux**:

```bash
sudo service postgresql start
```

### 4. Setup database

This project uses a PostgreSQL database. 
To connect, open the `.env` file inside the `backend` directory and fill in following database infomation:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_portal
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
```

> 💡 Replace `your_postgres_username` and `your_postgres_password` with your actual PostgreSQL credentials.

Open postgres with cmd. 

```bash
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
```

Create sql database with:

```bash
createdb school_portal
```

### 5. Run the backend

```bash
cd backend
npm run dev
```

### 6. Run the frontend

```bash
cd frontend
npm start
```

- Runs on: `http://localhost:3000`

> The frontend is configured to make API calls to `http://localhost:3001`.

---

### 🔍 API Documentation (Swagger UI)

Once the backend is running, you can explore and test all available API endpoints using Swagger UI:

👉 Open your browser and go to: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

If you configured a different port or path, adjust the URL accordingly.

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

## 📌 API Design Overview

### Teachers

| Method | Endpoint        | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/teachers` | Create a new teacher       |
| GET    | `/api/teachers` | Get list of all teachers   |

### Classes

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/api/classes` | Create a new class        |
| GET    | `/api/classes` | Get list of all classes   |

---

## 📋 API Design 

### POST `/teachers`

- **Purpose**: Add new teacher  
- **Request Body**:

```json
{
  "name": "string",
  "subject": "string",
  "email": "string",
  "contactNumber": "string"
}
```

- **Validation Rules**:
  - Email must be a valid gov email (`@moe.edu.sg` / `@gov.sg`)
  - Contact number must follow local format (e.g. 8 digits, start with 6/8/9)

> Suggestion: Use a request schema validation library (e.g. Joi, Zod) for robustness.

---

## 🔍 Assumptions

- A **simple in-memory or local database** is used during development.
- Only **basic validation** is enforced on email and contact number.
- No authentication is required for API access (public access assumed for demo).
- All frontend routes are static and handled via `react-router`.
- A teacher can only be a form teacher of one class.
- Teacher's email is unique and used as a foreign key for class creation.

---

## ✅ Features

- Add, list teachers
- Validation of input fields (frontend and backend)
- Clean UI with Ant Design
- Responsive layout and styled using CSS modules
- Swagger API documentation
