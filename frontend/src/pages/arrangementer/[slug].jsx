import CustomHead from '../../components/CustomHead/CustomHead';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { getEventsData } from '../../lib/events';
import EventInfo from '../../components/EventInfo/EventInfo';
import MainContainer from '../../components/MainContainer/MainContainer';
import { useRouter } from 'next/router';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import BackButton from '../../components/BackButton/BackButton';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

// Material-UI components
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const { API_URL } = process.env;

const DynamiskeArrangementer = ({ event, error }) => {
  const router = useRouter();
  if (error) {
    return <PageNotFound />;
  }

  const data = (contentToFix) => {
    // fixing the img url
    return contentToFix.split('/uploads/').join(`${API_URL}/uploads/`);
  };

  // Grabbing the category title and event info.
  const { body, seo, linkToEventPage } = event.attributes;
  const { title } = event.attributes.event.data.attributes;

  return (
    <div>
      <CustomHead seo={seo} />
      <CustomHeader header={event.attributes} desc={false} />

      <MainContainer>
        <BackButton />
        <Stack
          direction={{ md: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          spacing={5}
        >
          <div style={{ textAlign: 'left' }}>
            <ReactMarkDown
              className="markdown"
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
              {data(body)}
            </ReactMarkDown>
          </div>
          <EventInfo event={event} />
        </Stack>
        {linkToEventPage && (
          <Box
            sx={{
              marginBottom: '3em',
              marginTop: '3em',
            }}
          >
            <h4>
              {router.locale === 'nb'
                ? 'Les mer om arrangementet.'
                : 'Read more about the event.'}
            </h4>
            <Button variant="outlined" href={`/${linkToEventPage}`}>
              {router.locale === 'nb' ? `${title}` : `${title}`}
            </Button>
          </Box>
        )}
      </MainContainer>
    </div>
  );
};

export const getServerSideProps = async ({ query, locale }) => {
  const slug = query.slug ? query.slug.toString() : '/';
  const data = await getEventsData(slug, locale);
  const event = data.data;

  if (!event) {
    return {
      props: {
        error: 'oops',
      },
    };
  }

  return {
    props: {
      event,
    },
  };
};

export default DynamiskeArrangementer;
