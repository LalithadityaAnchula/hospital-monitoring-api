const express = require("express");

const {
  getHealthRecords,
  getUserHealthRecords,
  createHealthRecord,
} = require("../controllers/healthRecords");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const HealthRecord = require("../models/HealthRecord");

router
  .route("/")
  .get(protect, getHealthRecords)
  .get(protect, authorize("admin"), getUserHealthRecords)
  .post(protect, authorize("user"), createHealthRecord);

module.exports = router;
