require('dotenv').config()
const PORT = process.env.PORT || 8000;
const app = require('./app')
const ConnectedDB = require('./Models/data.models');


app.listen(3000, async() => {
  console.log(`Express server listening on http://localhost:${PORT}`);
  await ConnectedDB();
});