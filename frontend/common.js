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
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      data?.errors?.join(" ") ||
      data?.message ||
      `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
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

