const db = require("../db");

module.exports.addToCart = (req, res) => {
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;
  if(!sessionId) {
    res.redirect("/products");
    return;
  }
  
  let count = db.get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId, 0)
    .value()
  
  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .write();
  
//   db.get("sessions").find({ id: sessionId }).set("totalCart", sumCart).write()
  
//   res.render("books/products", {
//     product: db.get("sessions").find({ id: sessionId }).value()
//   })
  res.redirect("/products");
}
