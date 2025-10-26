import { useState, useEffect } from "react";
import UserConversation from "../zustand/UserConversation";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UserConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      setLoading(true);
      try {
        console.log("🔄 Fetching messages for user:", selectedConversation._id);
        
        const response = await axios.get(
          `http://localhost:3100/api/messages/get/${selectedConversation._id}`,
          { withCredentials: true }
        );

        console.log("✅ Messages response:", response.data);
        
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
        console.error("❌ Error response:", error.response?.data);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessage;