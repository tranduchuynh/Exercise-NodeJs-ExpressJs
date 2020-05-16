const User = require("../../models/users");

module.exports.index = async (req, res) => {
  const user = await User.find({ });
  res.json(user)
}

module.exports.view = async (req, res) => {
  const _id = req.params.id;
  console.log('_id', _id)
  const user = await User.findById(_id);
  
  res.json(user);
  
}

module.exports.update = async (req, res) => {
  const _id = req.params.id;
  
  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  
  res.json(user);
}

module.exports.delete = async (req, res) => {
  const _id = req.params.id;
  
  const user = await User.findByIdAndDelete(_id);
  
  res.json(user);
}