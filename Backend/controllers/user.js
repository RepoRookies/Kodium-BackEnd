import User from "../models/User.js"; // Fix the relative path
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

export const registerUser = async (req, res, next) => {
    const { username, rollnumber, password, starred_q, rating } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user with the hashed password
        const newUser = new User({
            username,
            rollnumber,
            password: hashedPassword,
            starred_q,
            rating
        });
        // Save user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        // Compare the password with the hashed password in DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, userId: user._id });
    } catch (err) {
        next(err);
    }
};

// Middleware to authenticate token (JWT)
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Access denied, token missing!" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next(); // Move to the next middleware or controller
    } catch (err) {
        return res.status(401).json({ message: "Invalid token!" });
    }
};
