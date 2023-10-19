const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,"..","client-bagel-buddy", "build")))

app.use(require('./express-server'));

app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname,"..","client-bagel-buddy", "build", "index.html"))
});
app.listen(8080, () => { console.log('server started!')});