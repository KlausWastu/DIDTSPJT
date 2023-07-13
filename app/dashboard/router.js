var express = require("express");
var router = express.Router();
const { index } = require("./controller");
const { isLogin } = require("../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", index);

module.exports = router;
