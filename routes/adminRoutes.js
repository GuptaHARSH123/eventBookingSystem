const express = require('express');
const {registerAdminController , loginAdminController } = require("../controller/adminController")

const router = express.Router();

router.post("/registerAdmin" , registerAdminController);

router.post("/loginAdmin" , loginAdminController);

module.exports = router;