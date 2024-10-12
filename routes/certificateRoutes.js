const express = require("express");
const {
  generateCertificateController,
} = require("../controllers/certificateController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/generate-certificate",
  [
    body("name", "Enter valid name").exists().isLength({ min: 3 }),
    body("email", "Enter valid email").exists().isEmail().isLength({ min: 3 }),
    body("phone", "Enter valid phone number").exists().isLength({ min: 3 }),
    body("registerId", "Register id must be present")
      .exists()
      .isLength({ min: 6 }),
    body("addressLine1", "Enter valid address").exists().isLength({ min: 3 }),
    body("addressLine2", "Enter valid address").exists().isLength({ min: 3 }),
    body("addressLine3", "Enter valid address").exists().isLength({ min: 3 }),
    body("dob", "Please provide date of birth").exists().isLength({ min: 5 }),
    body("gender", "Gender must exists").exists().isLength({ min: 1 }),
    body("bloodGroup", "Please provide blood group")
      .exists()
      .isLength({ min: 3 }),
    body("currentDateTime", "Enter date and time")
      .exists()
      .isLength({ min: 3 }),
  ],
  generateCertificateController
);

module.exports = router;
