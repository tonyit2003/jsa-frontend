const { default: httpRequest } = require("~/utils/httpRequest");

export const insertJobPost = async (
    token,
    job_title,
    job_description,
    job_requirements,
    job_location,
    job_type,
    salary_range
) => {
    return await httpRequest.post(
        "insert-job-post",
        {
            job_title,
            job_description,
            job_requirements,
            job_location,
            job_type,
            salary_range,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getJobPostPagination = async (page) => {
    return await httpRequest.get("get-job-post", {
        params: { page },
    });
};

export const getJobPostDetail = async (jobPostId) => {
    return await httpRequest.get("get-job-post-detail", {
        params: { jobPostId },
    });
};
