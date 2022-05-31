import qs from 'qs';
import axios from 'axios';
import * as Sentry from '@sentry/nextjs';

const { API_URL } = process.env;

const dayjs = require('dayjs');
require('dayjs/locale/nb');
const today = dayjs(new Date()).format('YYYY-MM-DD');

export const getAllEvents = async (query) => {
  let isLoading;
  let events;
  try {
    isLoading = true;
    const { data } = await axios.get(`${API_URL}/api/events?${query}`);
    isLoading = false;
    events = data;
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      Sentry.captureException(error.response.data);
      Sentry.captureException(error.response.status);
      Sentry.captureException(error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);

      Sentry.captureException(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
      Sentry.captureException(error.message);
    }
    events = ['error'];
    isLoading = false;
  }
  return { events, isLoading };
};

export const getThreeLatestEvents = async (locale) => {
  const query = qs.stringify(
    {
      locale: [`${locale}`],
      populate: '*',
      sort: ['date'],
      filters: {
        date: {
          $gte: today,
        },
      },
      pagination: {
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  try {
    const { data: res } = await axios.get(`${API_URL}/api/events?${query}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllEventsSlugs = async (locales) => {
  let paths = [];
  for (let locale of locales) {
    const query = qs.stringify(
      {
        locale: [`${locale}`],
      },
      {
        encodeValuesOnly: true, // prettify url
      }
    );

    try {
      const { data: res } = await axios.get(`${API_URL}/api/events?${query}`);

      res.data.forEach((p) =>
        paths.push({ params: { slug: p.attributes.slug }, locale })
      );
    } catch (error) {
      console.error(error);
    }
  }

  return paths;
};

export const getEventsData = async (slug, locale) => {
  const query = qs.stringify(
    {
      populate: '*',
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
    const { data: res } = await axios.get(`${API_URL}/api/events/?${query}`);
    return {
      data: res.data[0],
    };
  } catch (error) {
    console.error(error);
  }
};
