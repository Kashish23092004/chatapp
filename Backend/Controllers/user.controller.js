import mongoose from "mongoose";
import User from "../Model/User.model";

export const signup = async (req, res) => {
    const { Fullname, Email, Password, confirmPassword } = req.body;
    try {
        if (Password !== confirmPassword) {
            return res.status(400).json({ message: 'password and confirm Password do not match' })
        }
        if (Password.length < 6) {
            return res.status(400).json({ message: 'password must be at least 6 characters long' })
        }
        const existingUser = await User.findOne({ Email: Email })
        if (existingUser) {
            return res.status(400).json({ message: 'user with this email already exists' })
        }
        const newUser = new User({ Fullname, Email, Password });
        await newUser.save();
        res.status(201).json({ message: 'user created succesfully', User: newUser })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
}