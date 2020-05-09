const md5 = require("md5");
const db = require("../db");


module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
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
  
  const hardPassword = md5(password);
  console.log("ps", hardPassword);
  
  if(user.password !== hardPassword) {
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