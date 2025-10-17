import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
