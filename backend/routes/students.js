const express = require("express");
const Student = require("../../models/Student");

const router = express.Router();

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStudentPayload(body) {
  const errors = [];

  const name = body?.name;
  const rollNumber = body?.rollNumber;
  const department = body?.department;
  const marks = body?.marks;

  if (!isNonEmptyString(name) || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }
  if (!isNonEmptyString(rollNumber)) {
    errors.push("Roll number is required.");
  }
  if (!isNonEmptyString(department)) {
    errors.push("Department is required.");
  }
  const marksNum = Number(marks);
  if (!Number.isFinite(marksNum) || marksNum < 0 || marksNum > 100) {
    errors.push("Marks must be a number between 0 and 100.");
  }

  return {
    ok: errors.length === 0,
    errors,
    sanitized: {
      name: String(name || "").trim(),
      rollNumber: String(rollNumber || "").trim(),
      department: String(department || "").trim(),
      marks: marksNum
    }
  };
}

// POST /students -> Add student
router.post("/", async (req, res) => {
  try {
    const { ok, errors, sanitized } = validateStudentPayload(req.body);
    if (!ok) return res.status(400).json({ errors });

    const student = await Student.create(sanitized);
    return res.status(201).json(student);
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ errors: ["Roll number already exists."] });
    }
    return res.status(500).json({ errors: ["Server error."] });
  }
});

// GET /students -> Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ errors: ["Server error."] });
  }
});

// PUT /students/:id -> Update student
router.put("/:id", async (req, res) => {
  try {
    const { ok, errors, sanitized } = validateStudentPayload(req.body);
    if (!ok) return res.status(400).json({ errors });

    const updated = await Student.findByIdAndUpdate(req.params.id, sanitized, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ errors: ["Not found."] });
    return res.json(updated);
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ errors: ["Roll number already exists."] });
    }
    return res.status(500).json({ errors: ["Server error."] });
  }
});

// DELETE /students/:id -> Delete student
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ errors: ["Not found."] });
    return res.json({ message: "Deleted successfully." });
  } catch (err) {
    return res.status(500).json({ errors: ["Server error."] });
  }
});

module.exports = router;

