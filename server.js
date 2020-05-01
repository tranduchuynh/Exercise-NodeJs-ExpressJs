// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");

const adapter = new FileSync("db.json");
const db = low(adapter);

app.set("view engine", "/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.defaults({ todos: [] }).write();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index", {
    text: "I love CodersX"
  });
});

app.get("/todos", (req, res) => {
  const q = req.query.q;
  if (!q) {
    res.render("todos/index", {
      todos: db.get("todos").value()
    });
  } else {
    const matchTodos = db
      .get("todos")
      .value()
      .filter(todo => todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render("todos/index", {
      todos: matchTodos
    });
  }
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create");
});

app.post("/todos/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("todos")
    .push(req.body)
    .write();
  res.redirect("/todos");
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const name = db
    .get("todos")
    .find({ id })
    .value();
  res.render("todos/view", {
    name
  });
});

app.get("/todos/:id/delete", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const name = db
    .get("todos")
    .find({ id })
    .value();
  if (name) {
    db.get("todos").remove({ todo: name.todo }).write();
    res.render("todos/index", {
      todos: db.get("todos").value()
    });
  }
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
