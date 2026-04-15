const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    rollNumber: { type: String, required: true, trim: true, unique: true },
    department: { type: String, required: true, trim: true },
    marks: { type: Number, required: true, min: 0, max: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);

