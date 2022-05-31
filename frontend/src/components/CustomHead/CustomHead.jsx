import Head from 'next/head';
const { API_URL } = process.env;

const CustomHead = ({ seo }) => {
  return (
    <Head>
      {/* If no title, "Huset Gjøvik" is set */}
      <title>{seo?.metaTitle ? seo?.metaTitle : 'Huset Gjøvik'}</title>
      {seo?.metaTitle && <meta property='og:title' content={seo?.metaTitle} />}

      <meta name='viewport' content='initial-scale=1, width=device-width' />

      <meta
        name='description'
        content={
          seo?.metaDescription
            ? seo?.metaDescription
            : 'Studenthuset HUSET på Kallerud er et sosialt samlingspunkt for studenter på Gjøvik.'
        }
      />
      <meta
        property='og:description'
        content={
          seo?.metaDescription
            ? seo?.metaDescription
            : 'Studenthuset HUSET på Kallerud er et sosialt samlingspunkt for studenter på Gjøvik.'
        }
      />

      {/* The image meta tag defines the image you want to display. */}
      <meta
        property='og:image'
        content={`${API_URL}${seo?.metaImage?.data?.attributes.url}`}
      />

      {/* The robots tag is a useful element if you want to prevent certain articles from being indexed. */}
      {seo?.metaRobots && <meta name='robots' content={seo?.metaRobots} />}

      {/* Canonical tags tell sites like Google what domains are the most important to you. */}
      {seo?.canonicalURL && <link rel='canonical' href={seo?.canonicalURL} />}

      {seo?.keywords && <meta name='keywords' content={seo?.keywords} />}

      <link rel='icon' href='/favicon.png' />
    </Head>
  );
};

export default CustomHead;
