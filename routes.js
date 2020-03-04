const { Router } = require('express');
const ChatController = require('./src/controllers/ChatController');

const routes = Router();

routes.get('/chatbot/:chat_id', ChatController.index);
routes.post('/chatbot/send', ChatController.store);
routes.post('/chatbot/receive', ChatController.update);
// routes.post('/chatbot/sendMessage', ChatController.sendMessage);

module.exports = routes;