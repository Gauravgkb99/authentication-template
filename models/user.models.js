const {Schema, model} = require('mongoose')
const {createHmac, randomBytes} = require('crypto');
const {createToken} = require('../utils/auth.js')


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    salt: {
        type: String,
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');
    
    const hashedPassword = createHmac('sha256', salt)
                            .update(this.password)
                            .digest('hex');
    
    this.salt = salt;
    this.password = hashedPassword;
})

userSchema.static("matchPasswordAndTokenGeneration", async function(email, givenPassword){
    try {
        const user = await this.findOne({email: email});
    
        if(!user) return NULL;
    
        const hashedPassword = createHmac('sha256', user.salt)
                                .update(givenPassword)
                                .digest('hex');
    
        if(hashedPassword !== user.password){
            throw new Error('Incorrect Password')
        }
    
        const token = createToken(user);
        return token;

    } catch (error) {
        console.log(error);
    }

})


const User = model('User', userSchema);

module.exports = User;