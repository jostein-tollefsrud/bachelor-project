import styles from '../../styles/StaffBox.module.scss';
import Icon from '../Icon/Icon';
import MainContainer from '../MainContainer/MainContainer';
import GridContainer from '../GridContainer/GridContainer';

const StaffBox = ({ children, title, icon }) => {
  return (
    <div className={styles.container}>
      <MainContainer>
        <Icon className={styles.icon} size='3rem' type={icon} />
        <h2>{title}</h2>
        <GridContainer>{children}</GridContainer>
        {/* <div className={styles.gridLayout}>{children}</div> */}
      </MainContainer>
    </div>
  );
};

export default StaffBox;
