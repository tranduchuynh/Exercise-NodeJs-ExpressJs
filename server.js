require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./db");


const usersRouter = require("./routers/users.route");
const transRouter = require("./routers/transactions.route");
const booksRouter = require("./routers/books.route");
const authRouter = require("./routers/auth.route");
const productsRouter = require("./routers/products.route");
const cartRouter = require("./routers/cart.route");


const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.use(express.static("public"));

app.set("view engine", "/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("books/products", {
    products: db.get("books").value()
  });
});

app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/users", authMiddleware.requireAuth, usersRouter);
app.use("/trans", transRouter);
app.use("/books", authMiddleware.requireAuth, booksRouter);
app.use("/products", productsRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
