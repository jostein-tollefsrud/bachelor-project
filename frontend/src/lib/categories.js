const qs = require('qs');
const axios = require('axios');

const { API_URL } = process.env;

export const getAllCategories = async (locale) => {
  const query = qs.stringify(
    {
      locale: [`${locale}`],
      populate: '*',
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  try {
    const { data: res } = await axios.get(`${API_URL}/api/categories?${query}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
