
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export  const getUsersForSidebar = async (req, res) => {

    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}});
        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    }
      catch(err){
        res.status(500).json({message:"Internal Server Error"});
      }
    
};

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
        
        const message = await Message.find({$or:[{senderID:myId,receiverId:userToChatId},{ senderID:userToChatId,receiverId:myId}
        ]});
          res.status(200).json(message);

    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
};
export const sendMessage = async (req,res) =>{
  try{
    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const newMessage = new Message({
      text,
      senderID:senderId,
      receiverId,
      imageUrl
    });
    await newMessage.save();
    res.status(201).json({message:"Message sent successfully"});
  }
  catch(err){
    res.status(500).json({message:"Internal Server Error"});
  }
}

export default getMessages;