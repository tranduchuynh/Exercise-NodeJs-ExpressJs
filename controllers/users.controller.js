const shortid = require("shortid");
const cloudinary = require('cloudinary').v2
const db = require("../db");


// cloudinary.config({ 
//   cloud_name: process.env.cloud_name, 
//   api_key: process.env.api_key, 
//   api_secret: process.env.api_secret 
// });

let count = 0;
module.exports.index = (req, res) => {
  // if (req.cookies) {
  //   count++;
  //   console.log("cookie: " + count);
  // }
  const users = db.get("users").value();
  const page = req.query.page || 1; // n
  const perPage = 10 // x
  
  const start = (page - 1) * perPage;
  const end = page * perPage
  
  const total = Math.ceil(users.length / perPage);
  const totalUsers = users.slice(0, total);
  
  res.render("users/index", {
    users: db.get("users").value().slice(start, end),
    totalUsers,
    perPage,
    page
  });
};

module.exports.search = (req, res) => {
  const q = req.query.q;
  const users = db
    .get("users")
    .value()
    .filter(user => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  
  if(!req.file) {
    req.body.avatar = "https://cdn.glitch.com/87332411-ffe2-41eb-a342-1bb50956b03a%2Favataaars.png?v=1589166409273"
  }else {
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
  }
  

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

module.exports.getId = (req, res) => {
  const id = req.params.id;
  const name = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/view", {
    name
  });
};

module.exports.edit = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .value();
  res.render("users/edit", {
    user
  });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  const users = db.get("users").value();
  const page = req.query.page || 1; // n
  const perPage = 10 // x
  
  const start = (page - 1) * perPage;
  const end = page * perPage
  
  const total = Math.ceil(users.length / perPage);
  const totalUsers = users.slice(0, total);
  
  const user = db
    .get("users")
    .find({ id })
    .value();
  if (user) {
    db.get("users")
      .remove({ id: user.id })
      .write();
    res.render("users/index", {
      users: db.get("users").value().slice(start, end),
    totalUsers,
    perPage,
    page
    });
  }
};

module.exports.postEdit = (req, res) => {
  const id = req.params.id;
  const user = db
    .get("users")
    .find({ id })
    .assign({
      name: req.body.name,
      phone: req.body.phone
    })
    .write();
  res.redirect("/users");
};

module.exports.avatar = (req, res) => {
  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  console.log(id)
  res.render("users/update-avatar", {
    user
  });
}

module.exports.postAvatar = async(req, res) => {
  const id = req.params.id;
  const avatar = req.file.path.split('/').slice(1).join('/');
  const avatarCloud = req.file.path;
  
  if(!id){
    console.log('not found id')
  }else {
    await db.get("users").find( { id } ).assign({ avatar }).write();
    cloudinary.uploader.upload(avatarCloud, function(error, result) { 
      if(error) console.log(error);
      let user = db.get("users").find({ id }).value();
      user.avatarUrl = ""
      req.body.avatarUrl = result.url
      db.get("users").find({ id }).assign({ avatarUrl: req.body.avatarUrl }).write();
    });
  }
  res.redirect("/users");
}
