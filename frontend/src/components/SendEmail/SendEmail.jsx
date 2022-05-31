import React from 'react';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import styles from '../../styles/IconCard.module.scss';

// Material-UI components
import Card from '@mui/material/Card';

function sendEmail() {
  return (
    <Card sx={{ maxWidth: 388 }}>
      <div className={`${styles.iconCard} ${styles.iconCardBackground}`}>
        <h3>Send e-post</h3>
        <p className={styles.description}>
          Om du ønsker å sende en epost direkte til oss kan du klikke på lenken
          under.
        </p>
        <div>
          <Icon type="mail" className={styles.icon} />
        </div>

        <Link href="mailto:styret@husetgjovik.no">
          <a className={styles.link_normal}>styret@husetgjovik.no</a>
        </Link>
      </div>
    </Card>
  );
}

export default sendEmail;
