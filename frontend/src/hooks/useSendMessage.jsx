import { useState } from "react";
import UserConversation from "../store/UserConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UserConversation();

  const sendMessage = async (message) => {
    if (!message.trim() || !selectedConversation?._id) {
      return;
    }

    setLoading(true);
    try {
      console.log("📤 Sending message to:", selectedConversation._id);
      
      const response = await axios.post(
        `http://localhost:3100/api/messages/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );

      console.log("✅ Message sent:", response.data);
      
      // Add new message to the messages array
      setMessages([...messages, response.data.newMessage]);
      
      return response.data;
    } catch (error) {
      console.error("❌ Error sending message:", error);
      console.error("❌ Error response:", error.response?.data);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;