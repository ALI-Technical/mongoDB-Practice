const mongoose = require("mongoose");


const carSchema = mongoose.Schema({
    brand_name: String,
    model: String,
    year: Number,
    avail: Boolean,
})

const carModel = mongoose.model("car", carSchema);

module.exports = carModel;