const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUsersCandidate = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userCandidate", {
        params: { page, per_page: perPage },
    });
};

export const deleteUserCandidate = async (id) => {
    return await httpRequest.delete(`delete-user-candidate/${id}`);
};

export const getInfoCandidate = async (token) => {
    return await httpRequest.get("get-candidate-information", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateInformationCandidate = async (
    token,
    resume,
    skills,
    experience,
    education
) => {
    return await httpRequest.post(
        "update-candidate-information",
        {
            resume,
            skills,
            experience,
            education
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};