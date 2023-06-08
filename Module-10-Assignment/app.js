const express = require('express');
const app = express();
const morgan = require('morgan');	
const cors = require('cors');
const helmet = require('helmet');
const proRouter = require('./routes/product.route');
const authMiddleware = require('./middlewares/jwtauth');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));






//Home Routes
app.get('/', (req, res) =>{
    res.send('<h1>Welcome to Home Route</h1>');
});
app.use('/', proRouter);
app.use(authMiddleware.authenticate);
//Invaild Routes
app.use("*", (req,res,next)=>{
    res.status(400).json({message:'Invalid Route!! Route Not Found'});
});
//Internal Server Error
app.use((error, req, res, next)=>{
    res.status(500).json({message: 'Internal Server Error'});
});
 module.exports = app; 	