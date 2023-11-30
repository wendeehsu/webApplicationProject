const app = require('./app');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const PORT = 8080;
require("dotenv").config({path:__dirname+'/.env'});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port ", PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
