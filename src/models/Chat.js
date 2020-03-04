const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    messages: {
        message_id: Number,
        username: String,
        date: Date,
        text: String,
        type: String
    }
});

module.exports = mongoose.model('Chat', ChatSchema);