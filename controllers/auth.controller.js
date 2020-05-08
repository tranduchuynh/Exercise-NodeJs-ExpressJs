const db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email
  
  const user = db.get("users").find({ email }).value();
  
  if(!user) {
    res.render("auth/login", {
      errors: [
        "User does not exists"
      ],
      values: req.body
    });
    return;
  }
  
  if(user.password !== req.body.password) {
    res.render("auth/login", {
      errors: [
        "Wrong password!"
      ],
      values: req.body
    });
    return;
  }
  
  
  res.cookie("userId", user.id);
  res.redirect("/users")
}