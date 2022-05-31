import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

// Material-UI components
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import MainContainer from '../MainContainer/MainContainer';
import GridContainer from '../GridContainer/GridContainer';
import NewsCard from '../NewsCard/NewsCard';
import GridItem from '../GridItem/GridItem';

import { getAllNews } from '../../lib/news';

const { API_URL } = process.env;

const NewsList = ({ backgroundColor }) => {
  const router = useRouter();
  const { locale } = router;

  const [newsList, setNewsList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchNews = async (locale) => {
      const query = qs.stringify(
        {
          locale: [`${locale}`],
          populate: '*',
          sort: ['publishedAt:desc'],
          pagination: {
            page: page,
            pageSize: 6,
          },
        },
        {
          encodeValuesOnly: true, // prettify url
        }
      );
      setLoading(true);
      const { news, error } = await getAllNews(query);
      //   const { data } = await axios.get(`${API_URL}/api/news-posts?${query}`);
      if (error) {
        setLoading(false);
        setServerError(true);
        return;
      }
      setTotalPages(news?.meta?.pagination?.pageCount);
      setNewsList([...news?.data]);
      setLoading(false);
    };
    fetchNews(locale);
  }, [page, locale]);

  const handleChange = (page) => {
    setPage(page);
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });
  };

  if (serverError)
    return (
      <MainContainer>
        <Alert severity="error">
          Server error – Kan ikke finne arrangementer!
        </Alert>
      </MainContainer>
    );

  return (
    <MainContainer backgroundColor={backgroundColor}>
      <GridContainer>
        {newsList &&
          newsList.map((news) => (
            <GridItem key={news.id}>
              <NewsCard news={news.attributes} />
            </GridItem>
          ))}
      </GridContainer>

      <Stack alignItems="center">
        <Pagination
          sx={{ pt: 3 }}
          hideNextButton={true}
          hidePrevButton={true}
          count={totalPages}
          color="primary"
          onChange={(e) => {
            handleChange(e.target.textContent);
          }}
        />
      </Stack>
    </MainContainer>
  );
};

export default NewsList;
