const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user)
    }
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })
      if (user) {
        done(null, user)
      } else {
        const newUser = new User({ googleId: profile.id }).save()
        done(null, newUser)
      }
    }
  )
)
