import { useAppContext } from '../../context/context';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Material-UI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';

import Icon from '../Icon/Icon';

const { API_URL } = process.env;

const Footer = ({ footer }) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const router = useRouter();

  const appContext = useAppContext();
  // let title = appContext.openingHours.attributes.OpeningHours;
  // let dayAndTimes = appContext.openingHours.attributes.daysAndOpeningTimes;

  // if (!appContext.openingHours2?.attributes) return null;
  if (!appContext.openingHours2?.attributes) {
    var title = '';
    var openingTimes = [''];
  } else {
    var { title, openingTimes } = appContext.openingHours2.attributes;
  }

  useEffect(() => {
    if (footer) {
      const [footerDocuments, footerSponsors] = footer ?? [];
      setDocuments(footerDocuments);
      setSponsors(footerSponsors);
      setDataFetched(true);
    }
  }, [footer, documents, sponsors]);

  if (dataFetched) {
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: 'secondary.main',
          color: '#FFF',
          textAlign: 'left',
          py: 6,
        }}
      >
        <Container>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-between"
          >
            {/* Kontaktinfo */}
            <Box>
              <h4>
                {router.locale === 'nb' ? 'Kontaktinformasjon' : 'Contact info'}
              </h4>

              <h5>{router.locale === 'nb' ? 'Adresse' : 'Address'}</h5>
              <address>
                <p>Teknologiveien 14, 2815 Gjøvik</p>
              </address>

              <Link href="kontakt">
                <a style={{ display: 'inline-block', padding: '.3em 0' }}>
                  {router.locale === 'nb' ? 'Kontakt oss' : 'Contact us'}
                </a>
              </Link>
              <br />
              <Link href="mailto:styret@husetgjovik.no">
                <a style={{ display: 'inline-block', padding: '.3em 0' }}>
                  {router.locale === 'nb'
                    ? 'Kontaktinfo til styret'
                    : 'Contact info for board'}
                </a>
              </Link>

              <br />

              {/* Social media */}
              <a
                href="http://facebook.com/husetgjovik"
                target="_blank"
                rel="noreferrer"
                className="footer_facebook"
                title="Huset Gjøvik Facebook"
                style={{ display: 'inline-block', padding: '.4em' }}
              >
                <Icon type="facebook" />
              </a>
              <a
                href="https://www.instagram.com/HusetGjovik/"
                target="_blank"
                rel="noreferrer"
                className="footer_social"
                title="Huset Gjøvik Instagram"
                style={{ display: 'inline-block', padding: '.4em' }}
              >
                <Icon type="instagram" />
              </a>
            </Box>

            {/* Åpningstider */}
            <Box>
              <h4>
                {router.locale === 'nb' ? 'Åpningstider' : 'Opening Hours'}
              </h4>
              <Table size="small" aria-label="åpningstider">
                <TableBody>
                  {openingTimes.map((opening) => (
                    <TableRow key={opening.id}>
                      <TableCell
                        sx={{
                          border: 0,
                          p: 0,
                          py: '3px',
                          pr: 4,
                          color: 'white',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                        }}
                      >
                        {opening.day}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          border: 0,
                          p: 0,
                          py: '3px',
                          color: 'white',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                        }}
                      >
                        {opening.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            {/* Dokumenter */}
            <Box>
              <h4>{router.locale === 'nb' ? 'Dokumenter' : 'Documents'}</h4>
              <ul style={{ listStyle: 'none' }}>
                {documents?.map((document) => (
                  <li key={document.id}>
                    <Link href={document.attributes.link || '/#'}>
                      <a style={{ padding: '.3em 0', display: 'inline-block' }}>
                        {document.attributes.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>

            {/* Sponsorer */}
            <Box sx={{ maxWidth: '200px' }}>
              <h4>{router.locale === 'nb' ? 'Sponsorer' : 'Sponsors'}</h4>
              {/* <Grid container colspacing={2} rowSpacing={2}> */}
              <Grid container spacing={2}>
                {sponsors?.map((sponsor) => (
                  <Grid item xs={6} key={sponsor.id}>
                    <Box
                      sx={{
                        width: '80px',
                        height: '80px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Link href={sponsor.attributes.link}>
                        <a aria-label={sponsor.attributes.name}>
                          <Image
                            src={`${API_URL}${sponsor.attributes.logo.data.attributes.url}`}
                            title={sponsor.attributes.name}
                            alt={
                              sponsor.attributes.logo.data.attributes.caption
                            }
                            layout="fill"
                            objectFit="contain"
                          />
                        </a>
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>

          <Box sx={{ textAlign: 'center', pt: 2 }}>
            <p>
              Huset Gjøvik 2022 &copy;{' '}
              {router.locale === 'nb' ? 'Utviklet av ' : 'Developed by '}{' '}
              <a
                href="https://www.josteintollefsrud.no"
                target="_blank"
                rel="noreferrer"
              >
                Jostein
              </a>
              ,{' '}
              <a
                href="https://leonardavdullahu.no/"
                target="_blank"
                rel="noreferrer"
              >
                Leonard
              </a>{' '}
              &amp;{' '}
              <a href="https://idatroan.no/" target="_blank" rel="noreferrer">
                Ida
              </a>
            </p>
          </Box>
        </Container>
      </Box>
    );
  } else {
    return null;
  }
};

export default Footer;
