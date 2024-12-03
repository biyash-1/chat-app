import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      trim: true,
    },
    image: {
     type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;