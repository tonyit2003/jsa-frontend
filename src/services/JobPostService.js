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

// Lấy danh sách bài viết tuyển dụng
export const getPaginationJobPost = async (page = 1, perPage = 10) => {
    return await httpRequest.get("jobPost", {
        params: { page, per_page: perPage },
    });
};

export const getInfoJobPostById = async (id) => {
    return await httpRequest.get("get-information-job-post", {
        params: { id },
    });
};

export const browserJobPost = async (id, status) => {
    return await httpRequest.put(`browser-job-post/${id}`, {
        status,
    });
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
