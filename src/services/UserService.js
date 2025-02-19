const { default: httpRequest } = require("~/utils/httpRequest");

export const loginUser = async (email, password) => {
    return await httpRequest.post("login", {
        email,
        password,
    });
};

export const getUserByToken = async (token) => {
    return await httpRequest.get("getUser", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const logoutUser = async (token) => {
    return await httpRequest.get("logout", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const registerUser = async (
    full_name,
    email,
    password,
    password_confirmation,
    phone_number,
    user_type
) => {
    return await httpRequest.post("register", {
        full_name,
        email,
        password,
        password_confirmation,
        phone_number,
        user_type,
    });
};
