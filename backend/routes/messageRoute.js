import express from "express";
const router = express.Router();
import authenticate from "../middleware/authmiddleware.js"

import {getMessages, getUsersForSidebar, sendMessage} from "../controllers/messageController.js";


router.get("/getUsers", authenticate,getUsersForSidebar);

router.get("/:id", authenticate, getMessages);
router.post("/send/:id", authenticate, sendMessage);

export default router;

