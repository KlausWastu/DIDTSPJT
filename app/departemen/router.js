var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  createDepartemen,
  viewEdit,
  editDepartemen,
  deleteDepartemen,
} = require("./controller");
const { isLogin } = require("../middleware/auth");

/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", createDepartemen);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", editDepartemen);
router.delete("/delete/:id", deleteDepartemen);
module.exports = router;
