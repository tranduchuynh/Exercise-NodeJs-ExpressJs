const express = require("express");
const router = express.Router();

const controllers = require("../controllers/cart.controller");

router.get("/add/:productId", controllers.addToCart);


module.exports = router;