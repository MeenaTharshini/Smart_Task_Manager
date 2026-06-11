const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const requests = [];

/*
CREATE REQUEST
*/
router.post("/", protect, (req, res) => {
  const { title, description } = req.body;

  const newRequest = {
    id: Date.now().toString(),
    title,
    description,

    createdBy: req.user.id,

    createdAt: new Date(),
  };

  requests.push(newRequest);

  res.status(201).json({
    message: "Request created",
    request: newRequest,
  });
});

/*
GET MY REQUESTS
*/
router.get("/my", protect, (req, res) => {
  const myRequests = requests.filter(
    (request) =>
      request.createdBy === req.user.id
  );

  res.status(200).json(myRequests);
});

/*
DELETE MY REQUEST
*/
router.delete("/:id", protect, (req, res) => {
  const request = requests.find(
    (r) => r.id === req.params.id
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  if (
    request.createdBy !== req.user.id
  ) {
    return res.status(403).json({
      message:
        "You can only delete your own requests",
    });
  }

  const index = requests.findIndex(
    (r) => r.id === req.params.id
  );

  requests.splice(index, 1);

  res.json({
    message: "Request deleted",
  });
});

/*
PUBLIC REQUEST FEED
*/
router.get("/", (req, res) => {
  res.json(requests);
});

module.exports = router;