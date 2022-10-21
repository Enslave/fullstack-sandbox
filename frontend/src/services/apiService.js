import axios from 'axios'

// TODO: Should be environment variable
const API_URL = 'http://localhost:3001'

export const apiService = {
    get: async slug => await axios({
        method: 'get',
        url: `${API_URL}${slug}`,
    }),
    post: async (slug, data) => await axios({
        method: 'post',
        url: `${API_URL}${slug}`,
        data,
    }),
    patch: async (slug, data) => await axios({
        method: 'patch',
        url: `${API_URL}${slug}`,
        data,
    }),
    delete: async slug => await axios({
        method: 'delete',
        url: `${API_URL}${slug}`,
    }),
}