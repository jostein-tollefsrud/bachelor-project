import { getNewsData } from '../../lib/news';
import { useRouter } from 'next/router';
import CustomHead from '../../components/CustomHead/CustomHead';
import NewsHeader from '../../components/NewsHeader/NewsHeader';
import MainContainer from '../../components/MainContainer/MainContainer';
import Markdown from '../../components/Markdown/Markdown';
import BackButton from '../../components/BackButton/BackButton';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

// Material-UI components
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const { API_URL } = process.env;

const DynamiskeNyheter = ({ news, error }) => {
  const router = useRouter();
  if (error) {
    return <PageNotFound />;
  }

  if (news.length === 0)
    return (
      <MainContainer>
        <Alert severity="error">Error – Kan ikke laste siden!</Alert>
      </MainContainer>
    );

  const { body, seo, coverImage } = news.attributes;
  const { url, alternativeText, height } = coverImage.data.attributes;

  return (
    <>
      <CustomHead seo={seo} />
      <NewsHeader header={news.attributes} />

      <Box
        sx={{
          maxWidth: '80ch',
          margin: 'auto',
          px: 1,
          pt: 4,
        }}
      >
        <Container>
          <BackButton />
          <img src={`${API_URL}${url}`} alt={alternativeText} />
        </Container>
      </Box>

      <Markdown content={body} />

      <Box
        sx={{
          marginBottom: '3em',
        }}
      >
        <h4>
          {router.locale === 'nb'
            ? 'Spørsmål angående dette?'
            : 'Questions regarding this?'}
        </h4>
        <Button variant="outlined" href="../kontakt">
          {router.locale === 'nb' ? 'Kontakt oss' : 'Contact us'}
        </Button>
      </Box>
    </>
  );
};

export const getServerSideProps = async ({ query, locale }) => {
  const slug = query.slug ? query.slug.toString() : '/';
  const data = await getNewsData(slug, locale);
  const news = data.data;

  if (!news) {
    return {
      props: {
        error: 'oops',
      },
    };
  }

  return {
    props: {
      news,
    },
  };
};

export default DynamiskeNyheter;
