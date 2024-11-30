import User from "..models/userModel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 // Ensure you set this in your .env file

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

       
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Create a JWT token
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } // Token expiration (optional)
        );

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token: token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export default signup;
