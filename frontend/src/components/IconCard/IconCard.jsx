import Link from 'next/link';
import Icon from '../Icon/Icon';
import styles from '../../styles/IconCard.module.scss';

// Material-UI components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import GridItem from '../GridItem/GridItem';

const IconCard = ({ card, fontColor }) => {
  const { title, description, link, icon, isTransparent } = card;
  return (
    <GridItem>
      <Paper
        elevation={isTransparent ? 0 : 8}
        sx={{
          p: isTransparent ? 0 : 4,
          backgroundColor: isTransparent ? 'transparent' : 'white',
          borderRadius: 3,
          color: fontColor,
        }}
      >
        <Stack>
          {icon && <Icon size="3em" type={icon} />}
          {title && <h3>{title}</h3>}
          {description && <span>{description}</span>}
          {link && (
            <Link href={link.href}>
              <a
                className={`${styles.link} ${
                  link.Type === 'link' ? styles.link_normal : styles.link_btn
                }`}
                target={`${link.isExternal ? '_blank' : ''}`}
              >
                {link.value}
              </a>
            </Link>
          )}
        </Stack>
      </Paper>
    </GridItem>
  );
};

export default IconCard;
