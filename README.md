# Ballon d'Or Voting System Backend

## Project Overview

This project is the backend side of the Ballon d'Or Voting System developed for the Special Topics in Computer Science course.

The backend provides authentication, nominee management, voting logic, admin CRUD operations, and API endpoints connected to a PostgreSQL database.

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pgAdmin
- pg
- dotenv
- CORS
- Nodemon

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

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create PostgreSQL Database

Create a database using pgAdmin, then add the connection information inside `.env`.

### 3. Create Environment File

Create a `.env` file in the project root:

```env
PORT=5000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

### 4. Run the Server

```bash
npm run dev
```

or:

```bash
node server.js
```

---

## API Endpoints

The API runs locally on:

```text
http://localhost:5000
```

---

## Authentication Routes

Base URL:

```text
/api/auth
```

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register a new user |
| POST   | /login    | Login existing user |

---

## Nominee Routes

Base URL:

```text
/api/nominees
```

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | /         | Get all nominees     |
| GET    | /:id      | Get nominee by ID    |
| POST   | /         | Add a new nominee    |
| PUT    | /:id      | Update nominee by ID |
| DELETE | /:id      | Delete nominee by ID |
| POST   | /:id/vote | Vote for a nominee   |

---

## Club Routes

Base URL:

```text
/api/clubs
```

| Method | Endpoint | Description                          |
| ------ | -------- | ------------------------------------ |
| GET    | /        | Get featured clubs from external API |

---

## Features

- User registration and login
- Admin and user role support
- PostgreSQL database connection
- Nominee CRUD operations
- Voting system
- One vote per category validation
- Live results support
- External football club API integration
- RESTful API structure

---

## Deployment

Backend Deployment URL:

```text
Will be added after Railway deployment
```

Database:

```text
PostgreSQL on Railway
```

---

## Author

Raheeq Mheidat

Special Topics in Computer Science Project
