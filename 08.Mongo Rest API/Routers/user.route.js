const Router = require('express').Router(); 
const {allUsers} = require('../Controllers/user.controller');




Router.get("/api/users", allUsers);
module.exports = Router;