const chatModel = require("../Models/chatModel");


const createChat = async (req, res) => {

    const {firstId, secondId} = req.body;

    try {

        if(!firstId || !secondId) return res.status(400).json("All filds are required");

        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        return res.status(200).json(response);

    }catch(error) {

        return res.status(500).json("server error");
     }
}

const findUserChat = async (req, res) => {
   
    const userId = req.params.userId;

    try{

        const chats = await chatModel.find({
            members: {$in: [userId]}
        });

        if(chats) return res.status(200).json(chats);

    }catch(error) {

        return res.status(500).json("server error");
     }
}

const findChat = async (req, res) => {
   
    const {firstId, secondId} = req.params;

    try{

        const chat = await chatModel.find({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

    }catch(error) {

        return res.status(500).json("server error");
     }
};

module.exports = {createChat, findUserChat, findChat};