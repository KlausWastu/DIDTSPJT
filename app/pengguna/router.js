var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  createDokumen,
  viewEdit,
  editDokumen,
  deleteDokumen,
  editPengguna,
  aktifkan,
} = require("./controller");
const { isLogin, admin } = require("../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", admin, index);
router.get("/create", admin, viewCreate);
router.post("/create", admin, createDokumen);
router.get("/edit/:id", admin, viewEdit);
router.put("/edit/:id", admin, editPengguna);
router.delete("/delete/:id", admin, deleteDokumen);
router.put("/aktifkan/:id", admin, aktifkan);
module.exports = router;
