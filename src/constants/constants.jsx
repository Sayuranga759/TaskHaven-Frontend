// Commom constants used in the application
export const EMPTY_STRING = "";
export const AUTH_COOKIE = "auth";
export const SPACE = " ";

// Success messages
export const LOGIN_SUCCESS = "Login successful!";

// Error messages
export const INVALID_EMAIL = "Invalid email address";
export const EMPTY_NAME = "Name cannot be empty.";
export const INVALID_PASSWORD =
    "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.";
export const MISMATCH_PASSWORD = "Passwords do not match.";
export const LOGIN_FAILED_LONG = "Login failed. Please check your email and password.";
export const LOGIN_FAILED_SHORT = "Login failed.";

// Regex patterns
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;


// App Lablels
export const statusLabels = {
    to_do: "To Do",
    on_hold: "On Hold",
    completed: "Completed"
};
  
export const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High"
};

