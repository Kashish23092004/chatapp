import mongoose from "mongoose";
import User from "../Model/User.model.js";
import bcrypt from 'bcrypt'
import createTokenAndSaveCookie from '../jwt/generatetoken.js'
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
        const hashPassword = await bcrypt.hash(Password,10);
        if (existingUser) {
            return res.status(400).json({ message: 'user with this email already exists' })
        }
        const newUser = new User({ Fullname, Email, Password:hashPassword });
        await newUser.save();
        createTokenAndSaveCookie(newUser._id,res);
        res.status(201).json({ message: 'user created succesfully', User: newUser })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error', error: error.message })
    }
}
export const login = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const existingUser = await User.findOne({ Email });
        if (!existingUser) {
            return res.status(400).json({ message: "invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(Password, existingUser.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid Credentials" });
        }
        createTokenAndSaveCookie(existingUser._id, res);
        res.status(200).json({
            message: "login successful",
            User: {
                _id: existingUser._id,
                Email: existingUser.Email,
                Fullname: existingUser.Fullname
            }
        });
    } catch (error) {
        res.status(500).json({ message: "internal server error", error: error.message });
    }
};
