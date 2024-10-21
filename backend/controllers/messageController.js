
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

import protectRoute from "../middlewares/protectRoute.js";

export const sendMessage = async(req, res)=>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;  //user._id from protectRoute function 

        // find the conversation between serder and receiver;
        let conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]}
        });

        //if the conversation is first time or doesn't exit 
        if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

        const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });

    }
}

export default sendMessage;