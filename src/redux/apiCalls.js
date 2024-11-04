import { loginStart, loginFailure, loginSuccess, logout } from "./userRedux";
import axios from "axios"; // Import axios

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // Use axios directly for the POST request with credentials
    const res = await axios.post("http://localhost:5001/auth/login", user, {
      withCredentials: true, // Allow sending of cookies
    });
    // Save the token to localStorage (or a cookie, based on your choice)
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logout());
};
