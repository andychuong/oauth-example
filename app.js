const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cookieSession = require('cookie-session')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth-routes')
const profileRouter = require('./routes/profile-routes')

const passport = require('passport')
const passportSetup = require('./config/passport-setup')


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET]
}));
// Middleware to initizilize passport & session
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)

// Home
app.get('/', (req, res) => {
  res.sendfile('public/filename.html')
})

module.exports = app
