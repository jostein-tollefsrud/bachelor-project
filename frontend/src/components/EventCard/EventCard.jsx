import Image from 'next/image';
import Link from 'next/link';
import {
  convertToLocaleDate,
  convertToLocaleTime,
} from '../../utils/converters';
const relativeTime = require('dayjs/plugin/relativeTime');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const dayjs = require('dayjs');
const isToday = require('dayjs/plugin/isToday');
require('dayjs/locale/nb');
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isSameOrBefore);
import { useRouter } from 'next/router';

// Material-UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';

const { API_URL } = process.env;

const EventCard = ({ event, buttonText }) => {
  const router = useRouter();
  dayjs.locale(router.locale);
  // event constants
  const { title, date, fromTime, toTime, slug } = event;
  const today = dayjs(new Date()).format('YYYY-MM-DD');

  // cover image constants
  const { alternativeText, url, width, height } =
    event.coverImage.data.attributes;

  //   const localeDate = convertToLocaleDate(date);
  const localeFromTime = convertToLocaleTime(fromTime).slice(0, -3);
  const localeToTime = convertToLocaleTime(toTime).slice(0, -3);

  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 3,
        position: 'relative',
      }}
    >
      {/* <Link href={`/arrangementer/${slug}`}></Link> */}
      <Link href={`/arrangementer/${slug}`}>
        <a>
          <CardActionArea>
            <CardMedia
              sx={{
                width: '100%',
                height: '250px',
                position: 'relative',
              }}
            >
              <Image
                alt={alternativeText}
                src={`${API_URL}${url}`}
                layout="fill"
                objectFit="cover"
                loading="lazy"
              />
            </CardMedia>

            <CardContent>
              {/* <div>{dayjs(today).to(date)}</div> */}
              <span style={{ fontSize: '1rem' }}>
                {`${dayjs(date).format(
                  'DD. MMMM YYYY'
                )}, kl. ${localeFromTime} – ${localeToTime}`}
              </span>
              <h3>{title}</h3>

              {/* Show how many days left to event */}
              {dayjs(today).isSameOrBefore(dayjs(date)) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '205px',
                    backgroundColor: 'white',
                    px: 2,
                    py: '4px',
                    borderRadius: 2,
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {dayjs(today).isBefore(dayjs(date)) && (
                    <div>{dayjs(today).to(date)}</div>
                  )}

                  {dayjs(date).isToday() && (
                    <div>{router.locale === 'nb' ? 'I dag!' : 'Today!'}</div>
                  )}
                </Box>
              )}

              {/* Show category for event */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                  py: '4px',
                  borderRadius: 2,
                  fontSize: '16px',
                  letterSpacing: 1,
                }}
              >
                {event?.event?.data.attributes.title}
              </Box>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
};

export default EventCard;
