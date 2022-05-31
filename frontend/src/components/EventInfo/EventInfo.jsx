const dayjs = require('dayjs');
require('dayjs/locale/nb');
const isToday = require('dayjs/plugin/isToday');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(isToday);
dayjs.extend(relativeTime);
import { useRouter } from 'next/router';

// Material-UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Icon from '../Icon/Icon';

const EventInfo = ({ event }) => {
  const {
    date,
    fromTime,
    toTime,
    ageLimitation,
    price,
    studentPrice,
    address,
    ticketURL,
  } = event.attributes;

  const router = useRouter();
  dayjs.locale(router.locale);

  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const localeDate = dayjs(date).format('DD. MMMM YYYY');

  /* Slices the milliseconds and seconds from the times */
  const slicedFromTime = fromTime.slice(0, -7);
  const slicedToTime = toTime.slice(0, -7);

  /* Check if date is passed */
  const datePassed = dayjs(date).isAfter(today);

  return (
    <div>
      <Stack
        alignItems="flex-start"
        sx={{ width: 'max-content', paddingLeft: { md: '1em', lg: '3em' } }}
        spacing={1}
      >
        <Box
          sx={{
            // position: 'absolute',
            // top: '425px',
            backgroundColor: 'primary.main',
            color: 'white',
            px: 2,
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

        <span>
          <Icon type="clock" /> {slicedFromTime} – {slicedToTime}
        </span>
        <span>
          <Icon type="calendar" /> {localeDate}
        </span>
        <span>
          <Icon type="map-pin" /> {address}
        </span>

        {/* Shows price and student price, if set. If not - free entrance */}
        <span>
          <Icon type="tag" />{' '}
          {price
            ? router.locale === 'nb'
              ? `Ordinær: ${price}kr`
              : `Ordinary: ${price}kr`
            : router.locale === 'nb'
            ? 'Gratis inngang'
            : 'Free entrance'}
          {studentPrice ? ` | Student: ${studentPrice}kr` : ''}
        </span>

        {/* Shows age limitation, but only if set. */}
        {ageLimitation && (
          <span>
            <Icon type="alert-triangle" />
            {router.locale === 'nb' ? ' 18 års aldersgrense' : ' 18+ age limit'}
          </span>
        )}

        {/* Shows button to buy ticket, if a ticket url exists. Disables the button if event is passed
          (might be a cluttered way to solve this, will look into other possibilties) */}
        {ticketURL &&
          (datePassed ? (
            <Button variant="contained" href={ticketURL} target="_blank">
              {router.locale === 'nb' ? 'Kjøp billett' : 'Buy ticket'}
            </Button>
          ) : (
            <Button
              variant="contained"
              href={ticketURL}
              target="_blank"
              disabled
            >
              {router.locale === 'nb' ? 'Kjøp billett' : 'Buy ticket'}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default EventInfo;
