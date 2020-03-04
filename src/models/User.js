const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    messages: Array
});

module.exports = mongoose.model('User', UserSchema);