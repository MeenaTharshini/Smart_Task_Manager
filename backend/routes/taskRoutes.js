const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const crypto = require("crypto");

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

const adapter = new JSONFile(
  "db/db.json"
);

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

// GET MY TASKS
router.get("/", protect, async (req, res) => {
  await loadDB();

  const tasks =
    db.data.tasks.filter(
      (task) =>
        task.userId === req.user.id
    );

  res.json(tasks);
});

// ADD TASK
router.post("/", protect, async (req, res) => {
  await loadDB();

  const {
    title,
    description,
    status,
    priority,
  } = req.body;

  const newTask = {
    id: crypto.randomUUID(),

    userId: req.user.id,

    title,
    description:
      description || "",

    status:
      status || "Pending",

    priority:
      priority || "Medium",

    createdAt:
      new Date().toISOString(),
  };

  db.data.tasks.push(newTask);

  await db.write();

  res.status(201).json(newTask);
});

// UPDATE TASK
router.put(
  "/:id",
  protect,
  async (req, res) => {
    await loadDB();

    const task =
      db.data.tasks.find(
        (task) =>
          task.id === req.params.id &&
          task.userId === req.user.id
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    task.title =
      req.body.title ||
      task.title;

    task.description =
      req.body.description ||
      task.description;

    task.priority =
      req.body.priority ||
      task.priority;

    task.status =
      req.body.status ||
      task.status;

    await db.write();

    res.json(task);
  }
);

// DELETE TASK
router.delete(
  "/:id",
  protect,
  async (req, res) => {
    await loadDB();

    const index =
      db.data.tasks.findIndex(
        (task) =>
          task.id === req.params.id &&
          task.userId === req.user.id
      );

    if (index === -1) {
      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    db.data.tasks.splice(index, 1);

    await db.write();

    res.json({
      message:
        "Task deleted successfully",
    });
  }
);

module.exports = router;