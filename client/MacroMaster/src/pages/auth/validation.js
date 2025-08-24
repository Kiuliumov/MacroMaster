import { API_BASE_URL } from "../../config";

export const validateUsername = (username) => /^[A-Za-z0-9]{3,}$/.test(username);
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePassword = (password) => /^(?=.*[A-Za-z]).{8,}$/.test(password);

export const checkUsernameAvailable = async (username) => {
  if (!username) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/check_username/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    return res.ok;
  } catch (err) {
    console.error("Username check failed:", err);
    return false;
  }
};

export const checkEmailAvailable = async (email) => {
  if (!email) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/check_email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return res.ok;
  } catch (err) {
    console.error("Email check failed:", err);
    return false;
  }
};