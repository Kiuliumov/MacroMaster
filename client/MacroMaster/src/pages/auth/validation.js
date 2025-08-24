// utils/validation.js

// Username: at least 3 chars, only Latin letters & numbers
export const validateUsername = (username) => /^[A-Za-z0-9]{3,}$/.test(username);

// Email: standard email regex
export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Password: at least 8 chars, must contain at least one letter
export const validatePassword = (password) =>
  /^(?=.*[A-Za-z]).{8,}$/.test(password);
