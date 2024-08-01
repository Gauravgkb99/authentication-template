const express = require('express');
const { connectToDB } = require('./connection');
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT
const url = process.env.DATABASE_URL

const userRoute = require('./routes/user.routes');
const { checkForAuthentication } = require('./middlewares/auth.middleware');

const app = express();

connectToDB(url)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console. log('Error connecting ', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/user', userRoute);
app.get('/', checkForAuthentication, (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})