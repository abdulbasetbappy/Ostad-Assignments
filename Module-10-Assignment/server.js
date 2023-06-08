require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5050;
const ConnectedDB = require('./models/product.model');



app.listen(PORT, async()=>{
    console.log(`Your Server is listening on http://localhost:${PORT}`);
    await ConnectedDB();
});