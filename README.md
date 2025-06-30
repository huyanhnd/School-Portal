# 📘 School Portal

This is a simple web application for managing teachers and classes, built with **React** (frontend) and **Node.js/Express** (backend API).

---

## 📦 Folder Structure

```
school-portal/
├── client/           # React Frontend (TypeScript + Ant Design)
└── server/           # Express API (with Swagger docs)
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js >= 18
- npm or yarn
- PostgreSQL

---

### 1. Clone the repository

```bash
git clone https://github.com/huyanhnd/school-portal.git
cd school-portal
```

---

### 2. Run Backend API Server

```bash
cd server
npm install
npm run dev
```

- Runs on: `http://localhost:3001`
- Swagger docs: `http://localhost:3001/api-docs`

---

### 3. Run Frontend React App

```bash
cd ../client
npm install
npm run dev
```

- Runs on: `http://localhost:3000`

> The frontend is configured to make API calls to `http://localhost:3001`.

---

## 📋 API Design (Suggestions)

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

---

## ✅ Features

- Add, list teachers
- Validation of input fields (frontend and backend)
- Clean UI with Ant Design
- Responsive layout and styled using CSS modules
- Swagger API documentation
