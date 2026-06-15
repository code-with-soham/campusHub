const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, admin } = require("../middleware/auth");

// Get All Events
router.get("/", getEvents);

// Get Event By ID
router.get("/:id", getEventById);

// Create a New Event (Only Admins can create events)
router.post("/", protect, admin, createEvent);

// Update an Event (Only Admins can update events)
router.put("/:id", protect, admin, updateEvent);

// Delete an Event (Only Admins can delete events)
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;
