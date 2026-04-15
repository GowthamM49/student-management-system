const fs = require("fs");
const path = require("path");

const { connectDB } = require("./db");
const Student = require("../models/Student");

async function seed() {
  await connectDB();

  const filePath = path.join(__dirname, "sample-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  // Reset and seed (simple for beginners)
  await Student.deleteMany({});
  await Student.insertMany(data);

  console.log(`Seeded ${data.length} students.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

