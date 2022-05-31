import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Material-UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

const dayjs = require('dayjs');
require('dayjs/locale/nb');

const { API_URL } = process.env;

const NewsCard = ({ news }) => {
  const router = useRouter();
  dayjs.locale(router.locale);

  return (
    <Card elevation={0} sx={{ textAlign: 'left', backgroundColor: 'inherit' }}>
      <Link href={`/nyheter/${news?.slug}`}>
        <a>
          <CardActionArea>
            <CardContent
              sx={{
                px: '5px',
                pb: '5px',
              }}
            >
              <span style={{ fontSize: '1rem' }}>
                {dayjs(news?.publishedAt).format('DD. MMMM YYYY')}
              </span>
            </CardContent>
            <CardMedia
              sx={{
                borderRadius: 3,
                width: '100%',
                height: '250px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image
                src={`${API_URL}${news?.coverImage?.data.attributes.url}`}
                alt={news?.coverImage?.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
                loading="lazy"
              />
            </CardMedia>

            <CardContent
              sx={{
                pt: '7px',
                px: '5px',
              }}
            >
              <h3>{news?.title}</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                {news?.description}
              </p>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
};

export default NewsCard;
