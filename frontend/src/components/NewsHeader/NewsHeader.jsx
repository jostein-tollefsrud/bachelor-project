const dayjs = require('dayjs');
require('dayjs/locale/nb');
import { useRouter } from 'next/router';

// Material-UI components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const NewsHeader = ({ header }) => {
  const router = useRouter();
  dayjs.locale(router.locale);

  const localeTime = dayjs(header.publishedAt).format('DD. MMMM YYYY HH:mm');

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'grey.100',
        color: '#000',
      }}
    >
      <Container>
        <div>
          <h1>{header.title}</h1>
          <p>{localeTime}</p>
        </div>
      </Container>
    </Box>
  );
};

export default NewsHeader;
