import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../util.js";

// Signup controller
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken({ email: newUser.email, id: newUser._id });

        res.status(201).json({ result: newUser, token, message: "Successful registration!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken({ email: existingUser.email, id: existingUser._id });

        res.status(200).json({ result: existingUser, token, message: "Successful logged in!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            user: {
                fullname: user.fullname,
                email: user.email,
                _id: user._id,
                createdOn: user.createdOn
            }, 
            message: "User found successfully"});
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};