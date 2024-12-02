import express from "express"

const router =  express.Router();

import signupUser from "../controllers/authcontroller.js";
import loginUser from "../controllers/authcontroller.js";

router.post("/signup", signupUser);
router.post("/login", loginUser);
export default signupUser