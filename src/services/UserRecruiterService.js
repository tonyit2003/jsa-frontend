const { default: httpRequest } = require("~/utils/httpRequest");

export const getPaginationUserRecruiter = async (page = 1, perPage = 10) => {
    return await httpRequest.get("userRecruiter", {
        params: { page, per_page: perPage },
    });
};

export const deleteUserRecruiter = async (id) => {
    return await httpRequest.delete(`delete-user-recruiter/${id}`);
};

export const getCompanyInformation = async (token) => {
    return await httpRequest.get("get-company-information", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateCompanyInformation = async (
    token,
    company_name,
    company_description,
    company_website
) => {
    return await httpRequest.post(
        "update-company-information",
        {
            company_name,
            company_description,
            company_website,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
