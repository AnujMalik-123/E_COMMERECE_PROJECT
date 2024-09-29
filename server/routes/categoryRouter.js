const categoryctrl = require("../controller/categoryctrl");
const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authadmin");

router
  .route("/category")
  .get(categoryctrl.getcategory)
  .post(auth, authAdmin, categoryctrl.createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryctrl.deleteCategory)
  .put(auth, authAdmin, categoryctrl.updatecategory);
module.exports = router;
