const express = require("express");
const jwt = require("jsonwebtoken");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const crypto = require("crypto");

const router = express.Router();

const adapter = new JSONFile("db/db.json");

const db = new Low(adapter, {
  users: [],
  tasks: [],
});

async function loadDB() {
  await db.read();

  db.data ||= {
    users: [],
    tasks: [],
  };
}

// REGISTER
router.post("/register", async (req, res) => {
  await loadDB();

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser =
    db.data.users.find(
      (user) => user.email === email
    );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  db.data.users.push(newUser);

  await db.write();

  res.status(201).json({
    message: "User registered successfully",
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  await loadDB();

  const { email, password } = req.body;

  const user =
    db.data.users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

  if (!user) {
    return res.status(401).json({
      message:
        "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;