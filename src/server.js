const express = require("express");
const server = express();
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();
server.use(cookieParser());
const port = process.env.PORT || 3000;
server.use("/uploads", express.static("uploads"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Static folder
server.use(express.static(path.join(__dirname, 'public')));

// View engine
server.set('view engine','ejs');
server.set('views', path.join(__dirname, 'views'));

// Routes
const userRoute = require('./routes/user.routes');
server.use('/user', userRoute);
const  pageRoute = require('./routes/pages.routes');
server.use('/page',pageRoute);
// DB
const connectiondb = require('./config/db');
connectiondb();

server.get('/', (req, res) => {
    res.render('index');
});
//listen request
server.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});
