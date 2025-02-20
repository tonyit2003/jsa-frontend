const { default: httpRequest } = require("~/utils/httpRequest");

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
