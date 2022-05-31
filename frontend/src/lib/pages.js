import qs from 'qs';
import axios from 'axios';

const { API_URL } = process.env;

export const getPage = async (slug, locale) => {
  const query = qs.stringify(
    {
      populate: {
        header: { populate: '*' },
        seo: { populate: '*' },
        dynamicZone: { populate: '*' },
      },
      locale: [`${locale}`],
      filters: {
        slug: slug,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  try {
    const res = await axios.get(`${API_URL}/api/pages?${query}`);
    return { data: res.data.data };
  } catch (error) {
    return null;
  }
};

export const getPageDynamicZone = async (slug, locale) => {
  const query = qs.stringify(
    {
      populate: [
        'dynamicZone',
        'dynamicZone.InfoCard',
        'dynamicZone.InfoCard.link',
        'dynamicZone.allFields.inputGroup',
        'dynamicZone.link',
        'dynamicZone.accordion',
        'dynamicZone.accordion_data',
      ],
      locale: [`${locale}`],
      filters: {
        slug: slug,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  try {
    const res = await axios.get(`${API_URL}/api/pages?${query}`);
    return { data: res.data.data };
  } catch (error) {
    return null;
  }
};
