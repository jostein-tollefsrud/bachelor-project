import qs from 'qs';
import axios from 'axios';
import * as Sentry from '@sentry/nextjs';

const { API_URL } = process.env;

export const getAllNews = async (query) => {
  let news;
  let error;
  try {
    const { data } = await axios.get(`${API_URL}/api/news-posts?${query}`);
    news = data;
  } catch (err) {
    if (err.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      Sentry.captureException(err.response.data);
      Sentry.captureException(err.response.status);
      Sentry.captureException(err.response.headers);

      error = err.response;
    } else if (err.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(err.request);

      Sentry.captureException(err.request);

      error = err.request;
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', err.message);
      Sentry.captureException(err.message);
      error = err.message;
    }
    news = [];
  }
  return { news, error };
};

export const getThreeLatestNews = async (locale) => {
  const query = qs.stringify(
    {
      locale: [`${locale}`],
      populate: '*',
      sort: ['publishedAt:desc'],
      pagination: {
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  let data;
  try {
    const { data: res } = await axios.get(`${API_URL}/api/news-posts?${query}`);
    data = await res.data;
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
    data = [];
  }
  return data;
};

export const getNewsData = async (slug, locale) => {
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

  let data;
  try {
    const { data: res } = await axios.get(
      `${API_URL}/api/news-posts/?${query}`
    );
    data = res.data[0];
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
    data = [];
  }

  return { data };
};
