const User = require("../../models/users");

module.exports.postLogin = async (req, res) => {
  const user = new User(req.body);

  await user.save();
  
  res.json(user);
};

