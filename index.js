const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-ouath20").Strategy;

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
