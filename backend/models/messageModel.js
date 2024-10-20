import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId, //this will set the senderId of the user sending the message
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, // set id of user receiving the message
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  
  // createdAt, updatedAt
}, {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;