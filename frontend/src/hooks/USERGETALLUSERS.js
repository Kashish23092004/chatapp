import { useState, useEffect } from "react";
import axios from "axios";

const USERGETALLUSERS = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        console.log("🔄 Fetching users...");
        
        const response = await axios.get("http://localhost:3100/api/test/allusers", {
          withCredentials: true,
        });

        console.log("✅ Full response:", response);
        console.log("✅ Users data:", response.data);
        
        setAllUsers(response.data || []);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        console.error("❌ Error response:", error.response?.data);
        console.error("❌ Error status:", error.response?.status);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default USERGETALLUSERS;