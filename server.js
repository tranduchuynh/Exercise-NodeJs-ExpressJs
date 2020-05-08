const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const usersRouter = require("./routers/users.route");
const transRouter = require("./routers/transactions.route");
const booksRouter = require("./routers/books.route");
const authRouter = require("./routers/auth.route");

const authMiddleware = require("./middlewares/auth.middleware");


app.use(express.static("public"));

app.set("view engine", "/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);

app.use("/users", authMiddleware.requireAuth, usersRouter);
app.use("/trans", authMiddleware.requireAuth, transRouter);
app.use("/books", authMiddleware.requireAuth, booksRouter);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
