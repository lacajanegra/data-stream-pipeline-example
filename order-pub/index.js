const app = require('./src')

app.listen(process.env.NODE_PORT, function () {
  console.log(`Example app listening on port ${process.env.NODE_PORT}!`);
});
