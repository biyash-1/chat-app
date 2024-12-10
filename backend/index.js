import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectdb from "./dbcon.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser";
// Middleware
dotenv.config();
connectdb();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

// Parse incoming JSON requests
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Corrected `app.use` for routing
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Start server
const PORT = 3001; // Define the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
