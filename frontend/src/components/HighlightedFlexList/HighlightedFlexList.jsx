import MainContainer from '../MainContainer/MainContainer';
import GridContainer from '../GridContainer/GridContainer';

const HighlightedFlexList = ({
  children,
  title,
  backgroundColor = 'white',
  fontColor,
}) => {
  return (
    <MainContainer backgroundColor={backgroundColor} fontColor={fontColor}>
      {title && <h2>{title}</h2>}
      <GridContainer>{children}</GridContainer>
    </MainContainer>
  );
};

export default HighlightedFlexList;
