const app = require('./app');
const cors = require('cors')
const routes = require("./routes/index");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const PORT = 8080;
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.use(cors());
        app.use("/api", routes);

        app.listen(PORT, () => {
            console.log("Server started on port ", PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
