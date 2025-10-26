import Conversation from '../Model/Conversation.model.js';

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.userId; // assuming auth middleware sets req.userId

    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized: senderId missing" });
    }

    // Find conversation containing both members and populate messages
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] }
      
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ message: "No conversation found", messages: [] });
    }

    res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error("Get Message error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
