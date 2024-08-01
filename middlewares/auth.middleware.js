const {verifyToken} = require('../utils/auth.js')

const checkForAuthentication = (req, res, next) => {
    const uUid = req.cookies?.token;

    if(!uUid){
        return res.redirect('/user/login')
    }

    const user = verifyToken(uUid);
    
    if(!user){
        return res.redirect('/user/login');
    }

    req.user = user;
    
    return next();
}

module.exports = {checkForAuthentication};