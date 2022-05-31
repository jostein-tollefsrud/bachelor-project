import qs from 'qs';
import axios from 'axios';

const { API_URL } = process.env;

export const getForms = async (locale) => {
  const query = qs.stringify(
    {
      populate: 'InputField.inputFieldGroup',
      locale: [`${locale}`],
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const { data: res } = await axios.get(`${API_URL}/api/forms?${query}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
