import express from "express"

const router =  express.Router();

import signup from "../controllers/authcontroller.js";

router.post("/signup", signup);

export default signup