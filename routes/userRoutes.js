const express = require('express');
const {registerController , loginController } = require("../controller/userController")

const router = express.Router();

router.post("/registerUser" , registerController);

router.post("/loginUser" , loginController);

module.exports = router;