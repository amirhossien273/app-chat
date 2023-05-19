const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => {

    const {chatId, senderId, text} = req.body;

    try {

        if(!chatId || !senderId || !text) return res.status(400).json("All filds are required");
        
        const message = new messageModel({
            chatId,
            senderId,
            text
        });
        
        const response = await message.save();
    
        return res.status(200).json(response);

    }catch(error) {

        return res.status(500).json("server error");
     }
};

const getMessges = async (req, res) => {

    const {chatId} = req.params;

    try {
        console.log(chatId);
        const messages = await messageModel.find({chatId});
        console.log(messages);  
        return res.status(200).json(messages);

    }catch(error) {

        return res.status(500).json(error);
     }
};

module.exports = {createMessage, getMessges};