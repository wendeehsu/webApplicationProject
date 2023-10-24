const express = require('express');
const path = require('path');
const { pingDB } = require('./database/conn.js');
const app = express();

app.use(express.static(path.join(__dirname,"..","client-bagel-buddy", "build")))

// app.use(require('./express-server'));
pingDB();

app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname,"..","client-bagel-buddy", "build", "index.html"))
});
app.listen(8080, () => { console.log('server started!')});
