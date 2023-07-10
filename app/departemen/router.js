var express = require('express');
var router = express.Router();
const {index, viewCreate, createDepartemen, viewEdit, editDepartemen} = require("./controller")

/* GET home page. */
router.get('/', index);
router.get("/create", viewCreate)
router.post("/create",createDepartemen)
router.get("/edit/:id", viewEdit)
router.put("/edit/:id", editDepartemen)
module.exports = router;
