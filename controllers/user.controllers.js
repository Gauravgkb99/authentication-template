const User = require('../models/user.models')

const handleLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await User.matchPasswordAndTokenGeneration(email, password);
    
        if(!token){
            return res.redirect('/user/login')
        }
    
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        console.log(error);
        return res.redirect('/user/login')
    }
}

const handleSignUp = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.create({
            name, 
            email,
            password
        });
    
        if(!user){
            return res.redirect('/user/signup')
        }
    
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        return res.redirect('/user/signup')
    }
}

module.exports = {
    handleLogin,
    handleSignUp
}