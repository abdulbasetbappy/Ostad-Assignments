require('dotenv').config();
const PORT = process.env.MY_PORT || 4040;
const app = require('./app');
const ConnectedDB = require('./models/books.model');


app.listen(PORT, async()=>{
    console.log(`Your Server is listening Successfully On http://localhost:${PORT}`);
    await ConnectedDB();
});