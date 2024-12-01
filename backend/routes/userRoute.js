import express from "express"

const router =  express.Router();

import signupUser from "../controllers/authcontroller.js";

router.post("/signup", signupUser);
export default signupUser