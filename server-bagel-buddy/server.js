const express = require('express');
const app = express();
const routes = require("./routes/index");
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const db_uri = "mongodb+srv://user1:user1@bagel.ga3mauc.mongodb.net/BagelBuddy?retryWrites=true&w=majority";
const PORT = 8080;

const run = async () => {
    try {
        await mongoose.connect(db_uri);
        app.use(cors());
        app.use(express.json());
        app.use("/api", routes);

        app.listen(PORT, () => {
            console.log('server started on port ', PORT)
        });
    } catch (e) {
        console.log(e.message);
    }
};

run();
