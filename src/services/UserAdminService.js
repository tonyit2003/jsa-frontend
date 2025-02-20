const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUsersAdmin = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userAdmin", {
        params: { page, per_page: perPage },
    });
};

export const getInfoUserById = async (id) => {
    return await httpRequest.get("get-information-user", {
        params: { id },
    });
};

export const addUserAdmin = async (
    full_name,
    email,
    password,
    phone_number,
    user_type
) => {
    return await httpRequest.post("create-user-admin", {
        full_name,
        email,
        password,
        phone_number,
        user_type,
    });
};

export const updateUserAdmin = async (
    id,
    email,
    full_name,
    phone_number,
) => {
    return await httpRequest.put(`edit-user/${id}`, {
        email,
        full_name,
        phone_number,
    });
};

export const deleteUserAdmin = async (id) => {
    return await httpRequest.delete(`delete-user-admin/${id}`);
};