const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("./passport");
const router = require("./router");

app.use(
  session({ saveUninitialized: true, secret: "mySecret", resave: false })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("", router);

app.use((err, req, res) => {
  console.log(err);
  res.json("error");
});

app.listen(3000, () => console.log("server is on"));
