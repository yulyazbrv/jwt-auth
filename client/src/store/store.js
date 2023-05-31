import axios from "axios";
import { loginUser } from "../api/login";
import { registrateUser } from "../api/registration";
import { API_URL } from "../helpers/apiHelper";
import { logoutUser } from "../api/logout";
import { deleteUser } from "../api/deleteUser";
import { blockUser } from "../api/blockUser";
import { unblockUser } from "../api/unblockUser";

export const registrate = async (name, email, password) => {
  try {
    const response = await registrateUser(name, email, password);
    localStorage.setItem("token", response.accessToken);
  } catch (e) {
    throw new Error("Incorrect data");
  }
};

export const login = async (email, password) => {
  try {
    const response = await loginUser(email, password);
    localStorage.setItem("token", response.accessToken);
  } catch (e) {
    throw new Error("Incorrect data");
  }
};

export const logout = async () => {
  try {
    await logoutUser();
    localStorage.removeItem("token");
  } catch (e) {
    console.log(e.response?.message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response;
  } catch (e) {
    console.log(e.response?.message);
  }
};

export const removeUser = async (emailArray) => {
  try {
    if (emailArray) {
      const responses = emailArray.map((email) => {
        return deleteUser(email);
      });
      Promise.all(responses);
    } else {
      console.log("emailArray is empty");
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const block = async (emailArray) => {
  try {
    if (emailArray) {
      const responses = emailArray.map((email) => {
        return blockUser(email);
      });
      Promise.all(responses);
    } else {
      console.log("emailArray is empty");
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const unblock = async (emailArray) => {
  try {
    if (emailArray) {
      const responses = emailArray.map((email) => {
        return unblockUser(email);
      });
      Promise.all(responses);
    } else {
      console.log("emailArray is empty");
    }
  } catch (e) {
    throw new Error(e);
  }
};
