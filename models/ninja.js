const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// geolocation Schema
const geoSchema = new Schema({
    // type of coordinate on a map
    type: {
        // defines what type of input is required = String
        type: String,
        default: 'Point',
        required: true
    },
    coordinates: {
        // define coordinates type as an array of numbers
        required: [true, 'Coordinates are required'],
        type: [Number],
        // type of map we'd like to use = 2dsphere
        index: '2dsphere'
    }
});

// create ninja Schema & model
const NinjaSchema = new Schema ({
    name: {
        type: String,
        // the second parameter returns feedback to the user if a String was not detected
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    // add a geo location for each ninja created based on the geoSchema attributes
    geometry: geoSchema
});

// 'ninja' will put into our collection of models and mongoose will pluralize the word to Ninja when we try to access it in MongoDB
// NinjaSchema is the Schema created above
const Ninja = mongoose.model('ninja', NinjaSchema);

// export it so other files can access
module.exports = Ninja;