var express = require('express');
var router = express.Router();
const {index, viewCreate, createDepartemen} = require("./controller")

/* GET home page. */
router.get('/', index);
// router.get("/create", viewCreate)
// router.post("/create",createDepartemen)
module.exports = router;
