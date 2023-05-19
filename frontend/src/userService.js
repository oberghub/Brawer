import axios from "axios";

const addUserApiUrl = "https://fhp9el40di.execute-api.us-east-1.amazonaws.com/dev/add";
const getUserApiUrl = "https://fhp9el40di.execute-api.us-east-1.amazonaws.com/dev/user";

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
      // const response = await axios.get(`${getUserApiUrl}/${email}`);
      const response = await axios.post(`${getUserApiUrl}`,JSON.stringify({"email":email}),{
        headers: {
          'Content-Type': 'application/json'
        }
      });
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