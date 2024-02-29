const app = require('./index');
const PORT = process.env.PORT || 5050
app.listen(PORT, (port) => console.log(PORT))