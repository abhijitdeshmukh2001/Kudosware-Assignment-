const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const dbconnection = require("./db/conn.js");
const User = require("./model/user.js");

const app = express();
app.use(express.json());

// Update CORS origin to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3001',  // Allow the frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

dbconnection(); // Connect to the database

const PORT = process.env.PORT || 3000; // Update port if necessary

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Server has started");
});

app.post("/addpeople", upload.single('resume'), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,  // Corrected typo
      resume: req.file ? req.file.path : null
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ error: "Failed to add user", details: error.message });
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
