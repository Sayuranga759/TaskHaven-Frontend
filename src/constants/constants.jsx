export const EMPTY_STRING = "";
export const EMPTY_NAME = "Name cannot be empty.";
export const INVALID_PASSWORD =
    "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.";
export const MISMATCH_PASSWORD = "Passwords do not match.";
export const INVALID_EMAIL = "Invalid email address";
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;