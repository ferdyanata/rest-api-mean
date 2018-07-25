const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
    // add in geo location
});

// 'ninja' will put into our collection of models and mongoose will pluralize the word to Ninja when we try to access it in MongoDB
const Ninja = mongoose.model('ninja', NinjaSchema);

// export it so other files can access
module.exports = Ninja;