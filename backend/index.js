import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectdb from "./dbcon.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors"
// Middleware
dotenv.config();
connectdb();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}))
// Parse incoming JSON requests

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Corrected `app.use` for routing
app.use("/api/user", userRoute);

// Start server
const PORT = 3001; // Define the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
