import express from "express";
const router = express.Router();
import authenticate from "../middleware/authmiddleware.js"

import {getMessages, getUsersForSidebar} from "../controllers/messageController.js";


router.get("/getUsers", authenticate,getUsersForSidebar);

router.get("/:id", authenticate, getMessages);


export default router;

