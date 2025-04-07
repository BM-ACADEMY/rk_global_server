const express = require("express");
const { uploadResume } = require("../controller/uploadController");

const router = express.Router();

// POST Route - Upload Resume & Send Email
router.post("/upload", uploadResume);

module.exports = router;
