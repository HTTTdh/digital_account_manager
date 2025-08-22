const express = require("express");
const { authentication } = require("../middleware/auth.js");
const { register, login, logout, update,  } = require("../controller/auth.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update/:id", authentication, update);

module.exports = router;
