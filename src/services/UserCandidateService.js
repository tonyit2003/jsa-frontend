const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUsersCandidate = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userCandidate", {
        params: { page, per_page: perPage },
    });
};
