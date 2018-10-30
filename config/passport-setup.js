require('dotenv').config() // 🔐
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const userModel = require('../models/user-model.js')

// do some serialize stuff!!! 13377777
// takes user, get id,

passport.serializeUser((user,done) => {
  done(null, user.id) // go to deserializeUser 🙀
})

// Get user to store in req.user 💯
passport.deserializeUser((id,done)=>{
  userModel.getOneUser(id)
    .then((user) =>{
      // console.log('deser ', user)
      // Do some passport session stuff,
      // then some cookie session stuff 😬😱
      done(null,user)
      // Then we go to the callbackURL 🛫
    })
})


// Takes two parameters
// - Strategy (takes in an object -- options for strategy)
// - Callback function
passport.use(
  new GitHubStrategy({
      // options for the GitHub Strategy
      // get this in your github developer settings
      // make some secrets 🤐🤐🤐🤐
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/redirect'
      // ^ goes to the router.get at the bottom of our auth-routes.js
      // lets us auth with GitHub. have res + req 😏
    },
    // passport call back function
    (accessToken, refreshToken, profile, done) => {
      // accessToken: token we get from GitHub
      // refreshToken: refreshes accessToken when it expires
      // profile: takes the code we get back, and brings back the profile info
      // done: we need to call when we are done with this callback

      // console.log('passport callback function fired')
      // console.log(profile.login)

      // Check if user is in our psql db, if not, make them
      userModel.checkUser(profile._json.id)
        .then((result) => {
          if (result) {
            // already ahve the user 👍
            console.log('user is: ', result)
            // null if error, or pass user
            done(null, result) // when done is called, we go to passport.serializeUser
          } else {
            // Create user
            let newUser = {
              username: profile.username,
              githubId: profile.id
            }
            userModel.create(newUser)
            console.log(`created new user ${newUser.username}`)
            done(null, newUser) // when done is called, we go to passport.serializeUser
          }
        })
        // .then(() => {
        //   console.log("Finish create or check user")
        // })
    }
  )
)
