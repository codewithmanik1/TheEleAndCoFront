// AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Utility function to safely parse JSON
const safeJsonParse = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

// Retrieve user data from localStorage
const user = localStorage.getItem("user");
const initialState = {
  isLoggedIn: !!user && safeJsonParse(user) !== null,
  user: safeJsonParse(user),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
       console.log("Login success payload:",state,action, action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
