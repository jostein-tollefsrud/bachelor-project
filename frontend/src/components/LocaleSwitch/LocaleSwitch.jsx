import Link from 'next/link';
import { useRouter } from 'next/router';
import FeatherIcon from 'feather-icons-react';
import * as Panelbear from '@panelbear/panelbear-js';

const LocaleSwitch = () => {
  const router = useRouter();
  const nbLocale = router.locale === 'nb';

  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <Link href={router.asPath} locale={nbLocale ? 'en' : 'nb'}>
      <a style={styles} onClick={() => Panelbear.track('ChangedLanguage')}>
        <FeatherIcon size="1em" icon={'globe'} />
        {nbLocale ? 'English' : 'Norsk'}
      </a>
    </Link>
  );
};

export default LocaleSwitch;
