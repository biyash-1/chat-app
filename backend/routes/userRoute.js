import express from "express";

const router = express.Router();
import authenticate from "../middleware/authmiddleware.js"

import { signupUser, loginUser,checkAuth } from "../controllers/authcontroller.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/checkAuth",authenticate, checkAuth);

export default router;
