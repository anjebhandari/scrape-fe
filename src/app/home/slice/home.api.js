import axios from 'axios';
let base = `${process.env.REACT_APP_REST_API_HOST}`;

export const searchList = async (formData) => {
    try {
        const res = await axios.post(`${base}scrape/search`, formData );
        if (res.data.success) {
            return res.data.data;
          }
    } catch (error) {
    throw error.response.data || error;
     }
}