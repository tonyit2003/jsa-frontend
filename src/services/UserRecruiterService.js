const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUserRecruiter = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userRecruiter", {
        params: { page, per_page: perPage },
    });
};