const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

//Database
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.log("Error while connecting to database!", err);
    process.exit();
});

//Middlewares
app.use([
    cors({
        origin: "http://localhost:4200"
    }),
    //parse content-type - application/json requests
    express.json(),
    //parse content-type - application/x-www-form-urlencoded requests
    express.urlencoded({ extended: true })
]);

//Routes
require("./routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
