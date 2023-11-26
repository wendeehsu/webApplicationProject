const app = require('./app');
const routes = require("./routes/index");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const PORT = 8080;
require("dotenv").config({path:__dirname+'/.env'});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.use("/api", routes);

        app.listen(PORT, () => {
            console.log("Server started on port ", PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
