import express from "express";
const router = express.Router();
import authenticate from "../middleware/authmiddleware.js"

import getMessages  from "../controllers/messageController.js";
import getUsersForSidebar from "../controllers/messageController.js";

router.get("/getUsers", authenticate, getUsersForSidebar);

router.get("/:id", authenticate, getMessages);
router.post("/sendMessage", sendMessage);

export default sendMessage;

