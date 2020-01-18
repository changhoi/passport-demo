const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");

passport.use(
  new LocalStrategy(
    { session: true, usernameField: "username", passwordField: "password" },
    (username, password, done) => {
      done(null, { state: ["LocalStrategy"] });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "mySecret"
    },
    (payload, done) => {
      payload.state.push("JWTStrategy");
      console.log(`payload: ${JSON.stringify(payload)}`);
      done(null, payload);
    }
  )
);

passport.serializeUser((user, done) => {
  user.state.push("serializeUser");
  console.log(`serializeUser: ${JSON.stringify(user)}`);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  user.state.push("deserializeUser");
  console.log(`deserializeUser: ${JSON.stringify(user)}`);
  done(null, user);
});

module.exports = passport;
