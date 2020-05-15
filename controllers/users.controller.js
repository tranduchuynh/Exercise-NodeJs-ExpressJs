const shortid = require("shortid");
const cloudinary = require("cloudinary").v2;
const db = require("../db");
const User = require("../models/users");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// console.log(process.env.CLOUDINARY_URL)
let count = 0;
module.exports.index = async (req, res) => {
  // if (req.cookies) {
  //   count++;
  //   console.log("cookie: " + count);
  // }
  // const users = db.get("users").value();
  const users = await User.find({});
  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(users.length / perPage);
  const totalUsers = users.slice(0, total);

  res.render("users/index", {
    users: users.slice(start, end),
    totalUsers,
    perPage,
    page
  });
};

module.exports.search = async (req, res) => {
  const q = req.query.q;
  const users = await User.find({});
  const user = users.filter(user => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(users.length / perPage);
  const totalUsers = users.slice(0, total);
  res.render("users/index", {
    users: user.slice(start, end),
    totalUsers,
    perPage,
    page
  });
};

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();

  if (!req.file) {
    req.body.avatar =
      "https://cdn.glitch.com/87332411-ffe2-41eb-a342-1bb50956b03a%2Favataaars.png?v=1589166409273";
  } else {
    req.body.avatar = req.file.path
      .split("/")
      .slice(1)
      .join("/");
  }

  const user = new User(req.body);
  await user.save();
  // db.get("users")
  //   .push(req.body)
  //   .write();
  // console.log('user', user)
  res.redirect("/users");
};

module.exports.getId = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findById({ _id });
  // const user = db.get("users").find({ id }).value();

  res.render("users/view", {
    user
  });
};

module.exports.edit = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findById({ _id });
  // const user = db.get("users").find({ id }).value();

  res.render("users/edit", {
    user
  });
};

module.exports.delete = async (req, res) => {
  const _id = req.params.id;

  const user = await User.findByIdAndDelete(_id);
  if (!user) {
    return res.send("Not found user");
  }
  // const users = db.get("users").value();
  const users = await User.find({});
  const page = req.query.page || 1; // n
  const perPage = 10; // x

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const total = Math.ceil(users.length / perPage);
  const totalUsers = users.slice(0, total);

  // const user = db
  //   .get("users")
  //   .find({ id })
  //   .value();

  res.render("users/index", {
    users: users,
    totalUsers,
    perPage,
    page
  });

  // if (user) {
  //   db.get("users")
  //     .remove({ id: user.id })
  //     .write();
  //   res.render("users/index", {
  //     users: db
  //       .get("users")
  //       .value()
  //       .slice(start, end),
  //     totalUsers,
  //     perPage,
  //     page
  //   });
  // }
};

module.exports.postEdit = async (req, res) => {
  const _id = req.params.id;

  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true
  });

  // const user = db
  //   .get("users")
  //   .find({ id })
  //   .assign({
  //     name: req.body.name,
  //     phone: req.body.phone
  //   })
  //   .write();
  res.redirect("/users");
};

module.exports.avatar = async (req, res) => {
  const _id = req.params.id;

  const user = await User.findById({ _id });

  // const user = db.get("users").find({ id }).value();
  // console.log(id)
  res.render("users/update-avatar", {
    user
  });
};

module.exports.postAvatar = async (req, res) => {
  const _id = req.params.id;

  const avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  const avatarCloud = req.file.path;

  const user = await User.findByIdAndUpdate(_id, { avatar }, { new: true });

  //   if(!user) {
  //     res.send("Not found user");
  //   }

  cloudinary.uploader.upload(avatarCloud, async function(error, result) {
    if (error) console.log("error", error);
    let user = await User.findById({ _id });
    req.body.avatarUrl = result.url;
    const avatar = await User.findByIdAndUpdate(
      _id,
      { avatarUrl: req.body.avatarUrl },
      { returnNewDocument: true, new: true, strict: false }
    );
    
  });

  // if (!id) {
  //   console.log("not found id");
  // } else {
  //   await db
  //     .get("users")
  //     .find({ id })
  //     .assign({ avatar })
  //     .write();
  //   cloudinary.uploader.upload(avatarCloud, function(error, result) {
  //     if (error) console.log(error);
  //     let user = db
  //       .get("users")
  //       .find({ id })
  //       .value();
  //     user.avatarUrl = "";
  //     req.body.avatarUrl = result.url;
  //     db.get("users")
  //       .find({ id })
  //       .assign({ avatarUrl: req.body.avatarUrl })
  //       .write();
  //   });
  // }
  res.redirect("/users");
};
