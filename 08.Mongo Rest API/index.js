const app = require('./app');
require('dotenv').config()
const PORT = process.env.PORT || 8686;


app.listen(PORT, ()=>{
    console.log(`listening on port http://localhost:${PORT}`);
});