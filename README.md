# Ballon d'Or Voting System Backend

## Project Overview

This is the backend side of the Ballon d'Or Voting System, developed for the Special Topics in Computer Science course.

The backend provides RESTful API endpoints for user authentication, nominee management, voting functionality, admin operations, and external football club data. It is connected to a PostgreSQL database and deployed on Railway.

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Railway PostgreSQL
- pg
- dotenv
- CORS
- Nodemon
- Git & GitHub

---

## Live Deployment

### Backend URL

```text
https://ballon-dor-backend-production.up.railway.app
```

### Frontend URL

```text
https://ballon-dor-frontend-production.up.railway.app
```

### Example API URL

```text
https://ballon-dor-backend-production.up.railway.app/api/nominees
```

---

## Project Structure

```bash
ballon-dor-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── nomineeController.js
│   └── clubController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── nomineeRoutes.js
│   └── clubRoutes.js
│
├── middleware/
├── models/
├── utils/
│
├── .env
├── .env.sample
├── .gitignore
├── server.js
├── package.json
└── README.md
```

---

## Features

- User registration
- User login
- Admin and user roles
- PostgreSQL database connection
- Nominee CRUD operations
- Voting system
- One vote per category validation
- Results support using nominee vote counts
- External football club API integration
- RESTful API structure
- Railway deployment

---

## Database

The project uses PostgreSQL. During development, pgAdmin was used locally. For deployment, the database is hosted on Railway PostgreSQL.

Main database tables:

- users
- categories
- nominees
- votes

Database relationships:

- A nominee belongs to one category.
- A vote belongs to one user.
- A vote belongs to one nominee.
- Users can vote once per category.

---

## Environment Variables

For local development, create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

The `.env` file is ignored by Git and should not be pushed to GitHub.

---

## Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Create PostgreSQL Database

Create a PostgreSQL database using pgAdmin.

### 3. Add Environment Variables

Add your database connection information inside the `.env` file.

### 4. Run the Backend Server

```bash
npm run dev
```

or:

```bash
node server.js
```

The local backend runs on:

```text
http://localhost:5000
```

---

## API Documentation

### Base URL

```text
https://ballon-dor-backend-production.up.railway.app
```

---

## Authentication Routes

Base route:

```text
/api/auth
```

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login existing user |

---

## Nominee Routes

Base route:

```text
/api/nominees
```

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/nominees          | Get all nominees     |
| GET    | /api/nominees/:id      | Get nominee by ID    |
| POST   | /api/nominees          | Add a new nominee    |
| PUT    | /api/nominees/:id      | Update nominee by ID |
| DELETE | /api/nominees/:id      | Delete nominee by ID |
| POST   | /api/nominees/:id/vote | Vote for a nominee   |

---

## Club Routes

Base route:

```text
/api/clubs
```

| Method | Endpoint   | Description                                      |
| ------ | ---------- | ------------------------------------------------ |
| GET    | /api/clubs | Get featured clubs from an external football API |

---

## Deployment

The backend is deployed on Railway.

```text
Backend:
https://ballon-dor-backend-production.up.railway.app
```

The production database is hosted using Railway PostgreSQL.

```text
Database:
Railway PostgreSQL
```

The frontend is also deployed on Railway.

```text
Frontend:
https://ballon-dor-frontend-production.up.railway.app
```

---

## API Testing

The main backend endpoints were tested using the browser and Postman to confirm that the backend is connected correctly to the Railway PostgreSQL database.

Tested endpoints include:

- GET /api/nominees
- GET /api/nominees/:id
- POST /api/auth/register
- POST /api/auth/login
- POST /api/nominees/:id/vote

---

## Author

Raheeq Mheidat

Special Topics in Computer Science
Full Stack Web Application Project
