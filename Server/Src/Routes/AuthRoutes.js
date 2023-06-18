const express = require("express");
const sessionChecker = require("../Middlewares/AuthMiddleware");
const {
  Login,
  register,
  LogOut,
  DashBoard,
  FetchImage,
  uploadImage,
} = require("../Controllers/AuthController");
const router = express.Router();

router.post("/", register);
router.post("/login", Login);
router.delete("/logout", LogOut);
router.get("/dashboard", DashBoard);
router.post("/upload-image", uploadImage);
router.post("/fetch", FetchImage);

module.exports = router;
