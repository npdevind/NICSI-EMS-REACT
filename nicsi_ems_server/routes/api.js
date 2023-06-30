const express = require("express");
const router = express.Router();
const cross = require("cors");

router.use(cross({
    origin: '*'
}));

const authController = require("../controllers/authController");
const { jwtMiddleware } = require("../middleware/jwtMiddleware");

router.post("/login", authController.login);

router.post("/registration", authController.registration);

router.get("/user", jwtMiddleware, authController.getUserData);

module.exports = router;
