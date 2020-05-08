const db = require("../db");

module.exports.requireAuth = (req, res, next) => {
  const id = req.cookies.userId;
  
  if(!id) {
    res.render("auth/login");
    return;
  }
  
  const user = db.get("users").find({ id }).value();
    
  if(!user) {
    res.render("auth/login");
    return;
  }

  if(!user.isAdmin) {
    const tran = db.get("trans").find({ userId: id }).value();
    res.render("trans", {
      trans: [ tran ],
      user
    });
    return;
  }
  
  next();
}

