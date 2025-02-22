const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUsersCandidate = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userCandidate", {
        params: { page, per_page: perPage },
    });
};

export const deleteUserCandidate = async (id) => {
    return await httpRequest.delete(`delete-user-candidate/${id}`);
};

export const checkApply = async (token, job_id) => {
    return await httpRequest.get("check-apply", {
        params: {
            job_id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const apply = async (token, job_id) => {
    return await httpRequest.post(
        "apply",
        { job_id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
