function qs(selector) {
  return document.querySelector(selector);
}

function setMessage(el, { type, text }) {
  el.className = type === "error" ? "error" : "success";
  el.textContent = text;
  el.style.display = "block";
}

function clearMessage(el) {
  el.textContent = "";
  el.style.display = "none";
}

async function apiFetch(path, options = {}) {
  // Static project mode:
  // This function simulates the same REST API using LocalStorage.
  // So you can open the HTML files directly without Node/Express/MongoDB.

  const STORAGE_KEY = "sms_students_v1";

  function readAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeAll(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }

  function ensureSampleData() {
    const existing = readAll();
    if (existing.length > 0) return;
    writeAll([
      { _id: "s1", name: "Asha Kumar", rollNumber: "CSE001", department: "CSE", marks: 92 },
      { _id: "s2", name: "Ravi Sharma", rollNumber: "ECE014", department: "ECE", marks: 78 },
      { _id: "s3", name: "Meera Iyer", rollNumber: "MECH007", department: "MECH", marks: 85 }
    ]);
  }

  function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    throw err;
  }

  ensureSampleData();

  const method = String(options.method || "GET").toUpperCase();
  const isStudents = path === "/students" || path === "students" || path === "students/";
  const matchById = String(path).match(/^\/?students\/([^/?#]+)$/);

  let body = null;
  if (options.body) {
    try {
      body = JSON.parse(options.body);
    } catch {
      body = null;
    }
  }

  // GET /students
  if (method === "GET" && isStudents) {
    const students = readAll();
    return students;
  }

  // POST /students
  if (method === "POST" && isStudents) {
    if (!body) httpError(400, "Invalid JSON body.");
    const students = readAll();

    const roll = String(body.rollNumber || "").trim().toLowerCase();
    const duplicate = students.some((s) => String(s.rollNumber).trim().toLowerCase() === roll);
    if (duplicate) httpError(409, "Roll number already exists.");

    const newStudent = {
      _id: `s_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: body.name,
      rollNumber: body.rollNumber,
      department: body.department,
      marks: body.marks
    };

    students.unshift(newStudent);
    writeAll(students);
    return newStudent;
  }

  // PUT /students/:id
  if (method === "PUT" && matchById) {
    const id = matchById[1];
    if (!body) httpError(400, "Invalid JSON body.");
    const students = readAll();
    const idx = students.findIndex((s) => String(s._id) === String(id));
    if (idx === -1) httpError(404, "Not found.");

    const roll = String(body.rollNumber || "").trim().toLowerCase();
    const duplicate = students.some(
      (s, i) => i !== idx && String(s.rollNumber).trim().toLowerCase() === roll
    );
    if (duplicate) httpError(409, "Roll number already exists.");

    students[idx] = { ...students[idx], ...body, _id: students[idx]._id };
    writeAll(students);
    return students[idx];
  }

  // DELETE /students/:id
  if (method === "DELETE" && matchById) {
    const id = matchById[1];
    const students = readAll();
    const idx = students.findIndex((s) => String(s._id) === String(id));
    if (idx === -1) httpError(404, "Not found.");
    students.splice(idx, 1);
    writeAll(students);
    return { message: "Deleted successfully." };
  }

  httpError(404, "Endpoint not found in static mode.");
}

function validateStudent({ name, rollNumber, department, marks }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters.");
  if (!rollNumber || !rollNumber.trim()) errors.push("Roll number is required.");
  if (!department || !department.trim()) errors.push("Department is required.");

  const marksNum = Number(marks);
  if (!Number.isFinite(marksNum) || marksNum < 0 || marksNum > 100) {
    errors.push("Marks must be between 0 and 100.");
  }

  return { ok: errors.length === 0, errors, sanitized: {
    name: String(name || "").trim(),
    rollNumber: String(rollNumber || "").trim(),
    department: String(department || "").trim(),
    marks: marksNum
  }};
}

