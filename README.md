# Student Management System (Node + Express + MongoDB)

## Features
- Add new student
- View all students (table)
- Update student details (edit inside table)
- Delete student

Student fields: **name**, **rollNumber**, **department**, **marks**

## Folder Structure
- `frontend/` - HTML, CSS, JS
- `backend/` - Express API + MongoDB connection + sample data
- `models/` - Mongoose schema

## API Endpoints
- `POST /students` - Add student
- `GET /students` - Get all students
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Setup (Beginner-friendly)
1. Install Node.js (LTS).
2. Start MongoDB locally (or use MongoDB Atlas).
3. In the project folder:

```bash
npm install
```

## Run the project
```bash
node app.js
```

Open:
- `http://localhost:3000` (Home)
- `http://localhost:3000/add.html`
- `http://localhost:3000/view.html`

## Seed Sample Data (optional)
This will delete existing students and insert sample students from `backend/sample-data.json`.

```bash
npm run seed
```

## MongoDB Connection
By default it connects to:
- `mongodb://127.0.0.1:27017/student_management`

To change it, set an environment variable:
- `MONGODB_URI`

