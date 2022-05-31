import { useRouter } from 'next/router';
import MainContainer from '../MainContainer/MainContainer';

// Material-UI components
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PageNotFound = () => {
  const router = useRouter();
  const nbLocale = router.locale === 'nb';
  return (
    <MainContainer component="main">
      <Stack justifyContent="center" alignItems="center" spacing={5}>
        <h1>
          404 🤕{' '}
          {nbLocale
            ? 'Beklager denne siden finner vi ikke'
            : "Sorry, this page can't be found"}
        </h1>
        <Button variant="outlined" onClick={() => router.push('/')}>
          {nbLocale ? 'Gå til fremsiden' : 'Go to front page'}
        </Button>
      </Stack>
    </MainContainer>
  );
};

export default PageNotFound;
