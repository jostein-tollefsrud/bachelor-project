import React from 'react';
import { useRouter } from 'next/router';

// Material-UI components
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function FormFeedback({ submissionSuccess, handleExit }) {
  const router = useRouter();
  const { locale } = router;
  const norsk = locale === 'nb';

  console.log(submissionSuccess);
  return (
    <Alert
      sx={{
        // width: '30%',
        // position: 'sticky',
        zIndex: '3',
        // top: 0,

        // margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      severity={submissionSuccess ? 'success' : 'error'}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ margin: 0 }}
          size="medium"
          onClick={() => {
            handleExit(false);
          }}
        >
          <CloseIcon sx={{ margin: '0' }} fontSize="inherit" />
        </IconButton>
      }
    >
      {submissionSuccess
        ? norsk
          ? 'Henvendelse sendt — Vi tar kontakt straks!'
          : 'Message sent — We will be in touch!'
        : norsk
        ? 'Noe gikk galt – Vennligst prøv igjen senere!'
        : 'Something went wrong – Try again later!'}
    </Alert>
  );
}

export default FormFeedback;
