const mongoose = require("mongoose");

const HealthRecordSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: [true, "Heart rate is required"],
  },
  pulse: {
    type: Number,
    required: [true, "Pulse rate is required"],
  },
  bp: {
    type: Number,
    required: [true, "Blood Pressure is required"],
  },
  saturation: {
    type: Number,
    required: [true, "Blood Pressure is required"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User id is required for a record"],
  },
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
  },
  isFine: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HealthRecord", HealthRecordSchema);
