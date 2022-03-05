const config = require("../config/db.config.js");
const mongoose = require("mongoose");

module.exports = {
    mongoose: mongoose,
    url: config.url,
    Patient: require("./patient.model.js")(mongoose)
}
