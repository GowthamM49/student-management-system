# Student Management System (Static Frontend)

git add .
git commit -m "test auto deploy"
git push




## Features
- Add new student
- View all students (table)
- Update student details (edit inside table)
- Delete student

Student fields: **name**, **rollNumber**, **department**, **marks**

## Folder Structure
- `frontend/` - HTML, CSS, JS
- `backend/` - (old) Node/Express/MongoDB version (optional, not needed for static)
- `models/` - (old) Mongoose schema (optional, not needed for static)

## How it works (Static)
The frontend simulates the same REST endpoints using **LocalStorage** (in `frontend/common.js`):
- `POST /students` - Add student
- `GET /students` - Get all students
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Run (Static)
Open these files directly in your browser:
- `frontend/index.html`
- `frontend/add.html`
- `frontend/view.html`

Sample data is added automatically on first run.

## Optional: Clear saved data
LocalStorage is per-browser. To reset:
- Open DevTools → Application/Storage → LocalStorage → remove `sms_students_v1`

