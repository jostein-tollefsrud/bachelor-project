import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';
import axios from 'axios';

// Material-UI components
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import MainContainer from '../MainContainer/MainContainer';
import GridContainer from '../GridContainer/GridContainer';
import GridItem from '../GridItem/GridItem';
import EventCard from '../EventCard/EventCard';

import { getAllEvents } from '../../lib/events';

const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs');
require('dayjs/locale/nb');
dayjs.extend(relativeTime);

const { API_URL } = process.env;

const AllEventsList = ({ backgroundColor }) => {
  const router = useRouter();
  const { locale } = router;
  const today = dayjs(new Date()).format('YYYY-MM-DD');

  const [eventsList, setEventsList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchCategories = async (locale) => {
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
        const { data } = await axios.get(`${API_URL}/api/categories?${query}`);
        setCategories([...data?.data]);
      } catch (error) {
        setServerError(true);
      }
    };
    fetchCategories(locale);

    const fetchEvents = async (locale) => {
      const selectedCategoryQuery = qs.stringify(
        {
          locale: [`${locale}`],
          populate: '*',
          filters: {
            event: {
              title: {
                $eq: selectedCategory,
              },
            },
            date: {
              $gte: today,
            },
          },
          pagination: {
            page: page,
            pageSize: 6,
          },
        },
        {
          encodeValuesOnly: true, // prettify url
        }
      );

      const allCategoriesQuery = qs.stringify(
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
            page: page,
            pageSize: 6,
          },
        },
        {
          encodeValuesOnly: true, // prettify url
        }
      );

      const archiveQuery = qs.stringify(
        {
          locale: [`${locale}`],
          populate: '*',
          sort: ['date:desc'],
          filters: {
            date: {
              $lt: today,
            },
          },
          pagination: {
            page: page,
            pageSize: 6,
          },
        },
        {
          encodeValuesOnly: true, // prettify url
        }
      );

      let query;
      switch (selectedCategory) {
        case 'all':
          query = allCategoriesQuery;
          break;
        case 'archive':
          query = archiveQuery;
          break;
        default:
          query = selectedCategoryQuery;
          break;
      }

      setLoading(true);
      const { events, isLoading } = await getAllEvents(query);
      setLoading(isLoading);
      if (events[0] === 'error') {
        setServerError(true);
        return;
      }
      setTotalPages(events?.meta.pagination.pageCount);
      setEventsList([...events?.data]);
    };
    fetchEvents(locale);
  }, [page, locale, selectedCategory, today]);

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
      <div className="categoriesFlex">
        {/* All button to select every event */}
        <Button
          sx={{ fontSize: '14px' }}
          variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
          onClick={() => {
            setSelectedCategory('all');
            setPage(1); // set page to 1 to see first events in specific category
          }}
        >
          {locale === 'nb' ? 'Alle' : 'All'}
        </Button>
        {categories &&
          categories.map((category) => (
            <Button
              sx={{ fontSize: '14px' }}
              key={category.id}
              variant={
                selectedCategory === category.attributes.title
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                setSelectedCategory(category.attributes.title);
                setPage(1); // set page to 1 to see first events in specific category
              }}
            >
              {category.attributes.title}
            </Button>
          ))}

        {/* Button select archived events */}
        <Button
          sx={{ fontSize: '14px' }}
          variant={selectedCategory === 'archive' ? 'contained' : 'outlined'}
          onClick={() => {
            setSelectedCategory('archive');
            setPage(1); // set page to 1 to see first events in specific category
          }}
        >
          {locale === 'nb' ? 'Arkiv' : 'Archive'}
        </Button>
      </div>
      {loading ? (
        <Box
          sx={{
            height: '350px',
          }}
        >
          <CircularProgress /> {/* Show loader if slow internet */}
        </Box>
      ) : (
        <>
          <GridContainer>
            {eventsList.length > 0 ? (
              eventsList.map((event) => (
                <GridItem key={event.id}>
                  <EventCard event={event.attributes} />
                </GridItem>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%', m: 4, pt: 4 }}>
                {locale === 'nb' ? (
                  <h2>Beklager, ingen nye arrangementer!</h2>
                ) : (
                  <h2>Sorry, no new events!</h2>
                )}
              </Box>
            )}
          </GridContainer>
        </>
      )}
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

export default AllEventsList;
