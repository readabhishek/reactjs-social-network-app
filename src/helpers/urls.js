

const API_ROOT = 'http://codeial.com:8000/api/v2';


/* Note: We are making this object to return a function because we want to make page and size dynamic  */

export const APIUrls = {
    login: () => `${API_ROOT}/users/login`,
    signup: () => `${API_ROOT}/users/signup`,
    fetchPosts: (page = 1, limit = 5) =>
        `${API_ROOT}/posts?page=${page}&limit=${limit}`,
};


