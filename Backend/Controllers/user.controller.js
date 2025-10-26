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
        if (existingUser) {
            return res.status(400).json({ message: 'user with this email already exists' })
        }
        const hashPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({ Fullname, Email, Password: hashPassword });
        await newUser.save();
        createTokenAndSaveCookie(newUser._id, res);

        res.status(201).json({
            message: 'user created successfully',
            _id: newUser._id,
            Email: newUser.Email,
            Fullname: newUser.Fullname
        })
    }
    catch (error) {
        console.error('Signup error:', error);
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
            _id: existingUser._id,
            Email: existingUser.Email,
            Fullname: existingUser.Fullname
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "internal server error", error: error.message });
    }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('just', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    
    console.log('✅ User logged out, cookie cleared');
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({ message: "internal server error", error: error.message });
  }
};

export const allUsers = async (req, res) => {
    try {
        console.log('📥 AllUsers API called');
        console.log('👤 Logged in user:', req.user);

        const loggedInUser = req.user._id;
        const filteruser = await User.find({ _id: { $ne: loggedInUser } }).select('-Password');

        console.log('📋 Filtered users:', filteruser);
        console.log('📊 Total users found:', filteruser.length);

        res.status(200).json(filteruser);
    }
    catch (error) {
        console.error('❌ Error in allUsers controller:', error);
        res.status(500).json({ message: "internal server error", error: error.message });
    }
}