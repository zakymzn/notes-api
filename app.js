const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const Note = require("./models/note");
const User = require("./models/user");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware JSON HARUS diletakkan sebelum routing
app.use(cors());
app.use(express.json()); // untuk menerima JSON
app.use(express.urlencoded({ extended: true })); // untuk menerima form-data/x-www-form-urlencoded

// Import dan pakai routing
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

// koneksi DB
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error:", err));

sequelize
  .sync()
  .then(() => console.log("Tables synchronized"))
  .catch((err) => console.error("Sync error:", err));

// routing placeholder
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
