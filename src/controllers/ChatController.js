const axios = require('axios');
const User = require('../models/User');

const base_url = 'https://api.telegram.org/bot918645602:AAGszMXvZnB9V-tZrQU7C3cSFbgxzv4gaeo';

module.exports = {
    async index(request, response) {
        const { chat_id } = request.params;

        const users = await User.find({ _id: chat_id });
    
        return response.json(users);
    },

    async store(request, response) {
        const { chat_id, text } = request.body;

        let user = await User.findOne({ _id: chat_id }).exec();

        const chat = await axios.post(base_url + '/sendMessage', {
            chat_id,
            text
        })
        .then((response) => {
            return response.data.result;
        }).catch((reject) => console.log(reject));

        if (chat) {
            let message = {
                message_id: chat.message_id,
                username: chat.from.username,
                date: chat.date,
                text: chat.text,
                type: chat.chat.type
            };

            user.messages.push(message);

            user = await user.save();

            return response.json(user);
        }
    },

    async update(request, response) {
        const data = request.body.message;

        console.log(data);

        let userData = {
            _id: data.from.id,
            first_name: data.from.first_name,
            last_name: data.from.last_name,
            messages: [],
        }

        let messageData = {
            message_id: data.message_id,
            type: data.chat.type,
            date: data.date,
            text: data.text,
        }        
        
        const user = await User.findOne({ _id: userData._id });
        // console.log(user);
        

        if (user) {
            user.messages.push(messageData);
            await user.save();
            // console.log(user);

            request.io.emit('userMessage', messageData);

            return response.json(user);
        } else {
            userData.messages.push(messageData);
            let newUser = User.create(userData);

            request.io.emit('userMessage', messageData);

            return response.json(newUser);
        }
    }
}