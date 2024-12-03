
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";

export const getUsersForSidebar = async (req, res) => {

    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}});
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