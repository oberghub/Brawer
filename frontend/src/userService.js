import axios from "axios";

const addUserApiUrl = "https://8n0eq6gfbj.execute-api.us-east-1.amazonaws.com/users/add-user";
const getUserApiUrl = "https://8n0eq6gfbj.execute-api.us-east-1.amazonaws.com/users/get-user";

const userService = {
  saveUserData: async (user) => {
    try {
      const response = await axios.post(addUserApiUrl, user);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  },

  getUserData: async (email) => {
    try {
      const response = await axios.get(`${getUserApiUrl}/${email}`);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  },

  clearUserData: () => {
    localStorage.removeItem("user");
  },
};

export default userService;