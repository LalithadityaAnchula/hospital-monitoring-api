const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const HealthRecord = require("../models/HealthRecord");

//@desc  Get all health records
//@route GET /api/v1/records
//@access Private
exports.getHealthRecords = asyncHandler(async (req, res, next) => {
  //fetching patient health records
  const patientHealthRecords = await HealthRecord.find({});
  patientHealthRecords.reverse();
  res.status(200).json({ success: true, data: patientHealthRecords });
});

//@route GET /api/v1/records/search
//@access Private
exports.getUserHealthRecords = asyncHandler(async (req, res, next) => {
  //searching patient health records with
  //copy req.query
  const reqQuery = { ...req.query };

  //fields to exclude
  const removeFields = ["search", "sort", "page", "limit"];

  //loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => {
    delete reqQuery[param];
  });

  //create query string
  let queryStr = JSON.stringify(reqQuery);

  //create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Creating query object
  let queryObject = JSON.parse(queryStr);

  //adding search target to query
  queryObject.name = new RegExp("^" + req.query.search, "i");

  //fetching data of patient health records
  const patientHealthRecords = await HealthRecord.find(queryObject);
  patientHealthRecords.reverse();
  res.status(200).json({ success: true, data: patientHealthRecords });
});

//@desc  Create new Health Record
//@route GET /api/v1/healthRecords
//@access Private
exports.createHealthRecord = asyncHandler(async (req, res, next) => {
  //adding user name request body
  req.body.userId = req.user._id;
  req.body.firstName = req.user.firstName;
  req.body.lastName = req.user.lastName;
  req.body.isFine = req.body.heartRate > 70;
  //Creating health record
  const healthRecord = await HealthRecord.create(req.body);
  res.status(201).json({ success: true, data: healthRecord });
});
