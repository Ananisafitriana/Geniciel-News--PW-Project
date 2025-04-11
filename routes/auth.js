const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/upload", authController.upload);
router.post("/login", authController.login);

module.exports = router;
