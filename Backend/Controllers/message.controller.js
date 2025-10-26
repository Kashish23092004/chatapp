import Message from "../Model/Message.model.js";
import Conversation from "../Model/Conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.userId; // ensure req.userId is set by your auth middleware
    const receiverId = req.params.id;

    if (!message) {
      return res.status(400).json({ message: "Message content is required" });
    }

    // Find if conversation exists between sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    // Create conversation if not exists
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        messages: []
      });
    }

    // Create new message document
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    await newMessage.save();

    // Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Send Message error:", error);
    res.status(500).json({ message: "internal server error", error: error.message });
  }
};
