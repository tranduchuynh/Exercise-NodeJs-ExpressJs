const db = require("../db"); 
// const Session = require("../models/sessions");

module.exports.addToCart = async (req, res) => {
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
  
  // let count = await Session.find({});
  // count.get("cart." + productId, 0);
  
  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .write();
  
  // const addCart = await Session.findById({ _id: sessionId });
  // addCart.set("cart." + productId, count + 1);
//   db.get("sessions").find({ id: sessionId }).set("totalCart", sumCart).write()
  
//   res.render("books/products", {
//     product: db.get("sessions").find({ id: sessionId }).value()
//   })
  res.redirect("/products");
}
