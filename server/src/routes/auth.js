const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { Router } = require("express");
const session = require("express-session");
const config = require("config");
const AUTH = config.get("auth");
const admin_url = config.get("admin_url");
const port = config.get("port");
const MANAGER = config.get("manager_email");
const { Agent } = require("../models");

function isManager(req, res, next) {
  if (req.user && req.user.emails[0].value === MANAGER) {
    next();
  } else if (req.user) {
    res.status(200).json({
      manager: false,
      user: req.user
    });
  } else {
    res.sendStatus(401);
  };
}

passport.use(new GoogleStrategy({
  clientID: AUTH.GOOGLE_CLIENT_ID,
  clientSecret: AUTH.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:${port}/api/auth/login/google/callback`,
  },
  async function verify(accessToken, refreshToken, profile, done) {
    const agent = await Agent.findOne({ where: { email: profile.emails[0].value } });
    if (agent) return done(null, profile);
    return done(null);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = Router()
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: AUTH.secret
  }))
  .use(passport.initialize())
  .use(passport.session())
  .get("/login/google",
    passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }))
  .get("/login/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/api/auth/login/error",
      successRedirect: `${admin_url}/admin`
    })
  )
  .get("/login/error", (_, res) => res.json({ error: "An error has occurred" }))
  .get("/current_user", isManager, (req, res) => {
    res.status(200).json({
      manager: true,
      user: req.user
    });
  })
  .get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
    });
    req.session.destroy();
    res.redirect(`${admin_url}/admin`);
  })
