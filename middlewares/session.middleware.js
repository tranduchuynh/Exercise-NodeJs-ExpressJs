const shortid = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });

    db.get("sessions").push({
      id: sessionId
    }).write();
  }
  console.log(req.signedCookies.sessionId)
  if(req.signedCookies.sessionId) {
    const sessionId = req.signedCookies.sessionId;
    const carts = db.get("sessions").find({ id: sessionId }).value();
    if(carts.cart){
      let sumCart =  Object.values(carts.cart).reduce((ac, cur) => {
        return ac + cur
      });
      res.locals.cart = sumCart;  
    }
  
  }
  
  next();
  
};
