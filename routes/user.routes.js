const express = require('express');
const {handleLogin, handleSignUp} = require('../controllers/user.controllers')

const router = express.Router();
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', handleLogin)



router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', handleSignUp)


module.exports = router;