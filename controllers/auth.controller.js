// const md5 = require("md5");
const bcrypt = require("bcrypt");
const db = require("../db");


module.exports.login = (req, res) => {
  res.render("auth/login");
}
let wrongLoginCount = 0;

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = db.get("users").find({ email }).value();
  
  if(!user) {
    wrongLoginCount++;
    res.render("auth/login", {
      errors: [
        "User does not exists"
      ],
      values: req.body,
      loginCount: wrongLoginCount
    });
    return;
  }
  
  // const passwordHash = await bcrypt.hash(user.password, 6);
  // console.log('user', passwordHash)

  
  const match = await bcrypt.compare(password, user.password);
  
  if(!match) {
    wrongLoginCount++;
    res.render("auth/login", {
      errors: [
        "Wrong password!"
      ],
      values: req.body,
      loginCount: wrongLoginCount
    });
    return;
  }
  
  wrongLoginCount = 0;
  
  res.cookie("userId", user.id);
  res.redirect("/users")
}