// Material-UI components
import Grid from '@mui/material/Grid';

const GridItem = ({ children }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      {children}
    </Grid>
  );
};

export default GridItem;
