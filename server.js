const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const usersRouter = require("./routers/users.route");
const transRouter = require("./routers/transactions.route");
const booksRouter = require("./routers/books.route");

app.use(express.static("public"));

app.set("view engine", "/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", usersRouter);
app.use("/trans", transRouter);
app.use("/books", booksRouter);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
