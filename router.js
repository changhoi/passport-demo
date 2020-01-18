const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/token", async (req, res) => {
  const user = { state: ["login router"] };
  console.log(`router: ${JSON.stringify(user)}`);
  req.login(user, err => {
    const token = jwt.sign(user, "mySecret");
    console.log("---------------------RESPONSE------------------------");
    return res.json(token);
  });
});

router.post(
  "/local",
  passport.authenticate("local", { session: true }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get("/session", (req, res) => {
  res.json(req.user);
});

router.get(
  "/check",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    console.log(req.user);
    console.log("---------------------RESPONSE------------------------");
    res.json(req.user);
  }
);
module.exports = router;
