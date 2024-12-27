
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import { getReceiverSocketId ,io} from "../socket.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export  const getUsersForSidebar = async (req, res) => {

    try{
        const loggedInUser = req.user.id;
        // console.log("loggedInUser",loggedInUser);
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}});
        // console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    }
      catch(err){
        res.status(500).json({message:"Internal Server Error"});
      }
    
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.id;

    // console.log("myId:", myId);
    // console.log("userToChatId:", userToChatId);

    const query = {
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    };

    // console.log("MongoDB Query:", query);

    const messages = await Message.find(query).sort({ createdAt: 1 }).lean(); // Sorting by creation time (oldest first)
    

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiver } = req.params; // Match with `receiver` in the schema
    const sender = req.user.id;
  

     // Match with `sender` in the schema

    let imageUrl = null;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }

    const newMessage = new Message({
      text,
      sender, 
      receiver, 
      image: imageUrl, 
    });

    await newMessage.save();

    const receiverSocketId =  getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default getMessages;