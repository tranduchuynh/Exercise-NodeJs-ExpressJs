// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.set("view engine", "/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [
  { id: 1, todo: "Đi chợ" },
  { id: 2, todo: "Nấu cơm" },
  { id: 3, todo: "Rửa bát" },
  { id: 4, todo: "Học tại CodersX" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index", {
    text: "I love CodersX"
  });
});

app.get("/todos", (req, res) => {
  const q = req.query.q;
  if(!q){
    res.render("todos/index", {
    todos
  });
  }else {
    let matchTodos = todos.filter(todo => 
     todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1
  );

  res.render("todos/index", {
    todos: matchTodos
  });
  }
});

app.get("/todos/create", (req, res) => {
  res.render("todos/create")
})

app.post("/todos/create", (req, res) => {
  todos.push(req.body)
  res.redirect("/todos")
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
