var express = require('express');
var router = express.Router();
const {index, viewCreate, createDepartemen, viewEdit} = require("./controller")

/* GET home page. */
router.get('/', index);
router.get("/create", viewCreate)
router.post("/create",createDepartemen)
router.get("/edit/:id", viewEdit)
module.exports = router;
