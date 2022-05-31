import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

// Material-UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const BackButton = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        marginBottom: '2em',
        marginTop: '2em',
      }}
      display="flex"
      justifyContent="flex-start"
    >
      <Button variant="outlined" onClick={() => router.back()}>
        <FiArrowLeft />
        &nbsp;
        {router.locale === 'nb' ? 'Tilbake' : 'Back'}
      </Button>
    </Box>
  );
};

export default BackButton;
