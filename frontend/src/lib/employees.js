import qs from 'qs';
import axios from 'axios';

const { API_URL } = process.env;

export const getEmployees = async (locale) => {
    const query = qs.stringify(
        {
            populate: '*',
            locale: [`${locale}`],
        },
        {
            encodeValuesOnly: true,
        }
    );

    try {
        const { data: res } = await axios.get(`${API_URL}/api/employees?${query}`);


        return res.data;
    } catch (error) {
        console.error(error);
    }
};