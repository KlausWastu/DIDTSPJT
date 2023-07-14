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
const { isLogin } = require("../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", createDokumen);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", editPengguna);
router.delete("/delete/:id", deleteDokumen);
router.put("/aktifkan/:id", aktifkan);
module.exports = router;
