const path = require("path");
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./backend/db");
const studentRoutes = require("./backend/routes/students");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use("/students", studentRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// Default page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

