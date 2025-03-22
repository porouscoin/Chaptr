const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const User = require("./models/Users"); // Import User model
const bcrypt = require("bcrypt");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chaptr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Dummy User Data (Replace with Database)
const users = [
  { id: 1, name: "John Doe", email: "test@example.com", password: "password" }
];

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If credentials are correct, return a success response
    res.status(200).json({
      message: "Login successful",
      token: "fake-jwt-token", // Replace with real JWT later
      user: { name: user.name, email: user.email },
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});


app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("🔹 Checking if email exists:", email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    console.log("🔹 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔹 Saving user to database...");
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ Registration successful!");
    res.status(201).json({
      message: "Registration successful",
      user: { name, email },
      token: "fake-jwt-token",
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});


// Serve Frontend (Fixes 404 on Refresh)
const clientBuildPath = path.join(__dirname, "client", "build");
app.use(express.static(clientBuildPath));

// Handle React Router Paths (Fixes 404 on Refresh)
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  } else {
    res.status(404).json({ message: "API route not found" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
