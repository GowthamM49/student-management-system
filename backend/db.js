const mongoose = require("mongoose");

async function connectDB() {
  const mongoUrl =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student_management";

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected");
}

module.exports = { connectDB };

