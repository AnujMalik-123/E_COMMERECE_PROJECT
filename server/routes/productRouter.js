const router = require("express").Router();
const productctrl = require("../controller/productctrl");

router
  .route("/products")
  .get(productctrl.getproduct)
  .post(productctrl.createproduct);
router
  .route("/products/:id")
  .delete(productctrl.deleteproduct)
  .put(productctrl.updateproduct);

module.exports = router;
