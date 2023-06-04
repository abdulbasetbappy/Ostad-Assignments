const express = require('express');
const app = express();
const cors = require('cors');
const ejs = require('ejs');
const morgan = require('morgan');
require("./config/database");
require("./config/passport")
const User = require('./models/user.model');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');


app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', "ejs");



//base Route
app.get('/', (req, res)=>{
    res.render("index");
});

//Route Not Found
app.get((req, res, next) => {
    res.status(404).json({
        message: "404 !! Content not found"
    });
});
//Server Error
app.get((error, req, res, next) => {
    res.status(500).json({
        message: " Something went wrong"
    });
});


//register Route Get
const checkRegIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
}
app.get('/register',checkRegIn, (req, res)=>{
    res.render("register");
});
//register Route Post
app.post('/register', async (req, res)=>{
    try {
    const user = await User.findOne({
         username: req.body.username
         });
    if (user) return res.status(400).send("user already exists");
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newUser = new User({
            username: req.body.username,
            password: hash 
        });
        await newUser.save()
        res.redirect("/login");
    });

    } catch (error) {
        res.status(500).send(error.message);
    }
});
//login Get Route
const checkLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile");
    }
    next();
}
app.get('/login',checkLoggedIn, (req, res)=>{
    res.render("login");
});
//login Post Route
app.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        successRedirect: '/profile' 
    })
);

//profile route protected
const checkAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.get('/profile', checkAuthenticated, (req, res)=>{
res.render("profile")
});


//logout Page
app.get('/logout', (req, res)=>{
    try {
        req.logout((err)=>{
            if (err){
                return next(err);
            }
            res.render("index");
        });
    } catch (error) {
        restart.status(500).send(error.message);
    }
});

module.exports = app;