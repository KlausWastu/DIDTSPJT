var express = require('express');
var router = express.Router();
const {index, viewCreate, createDokumen, viewEdit} = require("./controller")

/* GET home page. */
router.get('/', index);
router.get("/create", viewCreate)
router.post("/create",createDokumen)
router.get("/edit/:id", viewEdit)
module.exports = router;
