var express = require('express');
var router = express.Router();
const {index, viewCreate, createDokumen} = require("./controller")

/* GET home page. */
router.get('/', index);
router.get("/create", viewCreate)
router.post("/create",createDokumen)
module.exports = router;
