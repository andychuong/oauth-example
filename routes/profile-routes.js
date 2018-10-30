const router = require('express').Router();

//  if user isnt logged in take them to auth/login
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.render('profile', { user: req.user });
    res.send('logged in as: ' + req.user.username)
    // Do templating stuff ⁉️⁉️⁉️⁉️⁉️⁉️⁉️⁉️ or not? 🤢🤮
        // Probably should? 😮
        // or find another way to get user info 😱
    // res.sendfile('./public/profile.html')
    // res.redirect(`localhost:3000/public/?id=1`)
});

module.exports = router;
