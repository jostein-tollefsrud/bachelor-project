import '../styles/globals.scss';
import Layout from '../components/Layout/Layout';
import { AppWrapper } from '../context/context';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/theme';
import createEmotionCache from '../lib/createEmotionCache';
import getConfig from 'next/config';
import Router from 'next/router';

// analytics and cookies
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';

import qs from 'qs';
import axios from 'axios';

// Client-side cache shared for the whole session
// of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  usePanelbear(`${process.env.PANELBEAR_SITE_ID}`, {
    // debug: true,
    enabled: getCookieConsentValue() === 'true' ? true : false,
  });

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, 
                  consistent, and simple baseline to
                  build upon. */}

          <CssBaseline />
          <AppWrapper initialValue={props}>
            <Layout
              footer={[props.documents, props.sponsors]}
              navigation={props.navigation}
            >
              <Component {...pageProps} />

              <CookieConsent
                overlay
                overlayStyle={{ background: 'hsla(0, 0%, 0%, .7)' }}
                style={{
                  position: 'absolute',
                  maxWidth: '1200px',
                  margin: 'auto',
                  left: '0',
                  right: '0',
                  textAlign: 'left',
                }}
                buttonText="Godta :)"
                declineButtonText="Nei, takk!"
                enableDeclineButton
                onAccept={() => Router.reload()}
                onDecline={() => Router.reload()}
              >
                Vi bruker{' '}
                <a
                  href="https://panelbear.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Panelbear
                </a>{' '}
                for å samle informasjon om besøk på nettsiden. Det hentes ikke
                personopplysninger. Vi setter stor pris på om du ønsker å godta.
              </CookieConsent>
            </Layout>
          </AppWrapper>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

MyApp.getInitialProps = async ({ router }) => {
  // Get the locale from the user in order to fetch the translated data
  const { locale } = router;
  const query = qs.stringify(
    {
      locale: [`${locale}`], // only get translated data from users locale
      populate: '*',
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  );

  try {
    var { data: res } = await axios.get(
      `${publicRuntimeConfig.API_URL}/api/navigations?${query}`
    );

    var { data: resOpenings2 } = await axios.get(
      `${publicRuntimeConfig.API_URL}/api/all-opening-hour?${query}`
    );

    var { data: resDocuments } = await axios.get(
      `${publicRuntimeConfig.API_URL}/api/documents?${query}`
    );

    var { data: resSponsors } = await axios.get(
      `${publicRuntimeConfig.API_URL}/api/sponsors?${query}`
    );
  } catch (error) {
    console.log(error);
  }

  return {
    navigation: res?.data,
    openingHours2: resOpenings2?.data,
    documents: resDocuments?.data,
    sponsors: resSponsors?.data,
  };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
