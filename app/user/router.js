var express = require("express");
var router = express.Router();
const {
  viewSignin,
  actionSignin,
  logout,
  viewubahPass,
  ubahPass,
} = require("./controller");

/* GET home page. */
router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/ubahpass", viewubahPass);
router.put("/ubahPass/:id", ubahPass);
router.get("/logout", logout);
module.exports = router;
