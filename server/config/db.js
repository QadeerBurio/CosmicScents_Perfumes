const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ Database Not Connected:", err.message);
    process.exit(1); // Optional: Exit the process on failure
  }
};

connectDB();
