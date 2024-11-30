import express from 'express'
const app = express();
import dotenv from "dotenv"
import connectdb from "./dbcon.js"
import userRoute from "./routes/userRoute.js"

// Middleware

dotenv.config();
connectdb()
app.use(express.json()); // Parse incoming JSON requests

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

api.use("/api/user",userRoute)
// Start server
const PORT = 3001; // Define the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
