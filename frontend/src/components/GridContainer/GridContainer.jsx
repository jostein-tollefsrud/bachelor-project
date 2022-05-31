// Material-UI components
import Grid from '@mui/material/Grid';

const GridContainer = ({ children, spacing = 4 }) => {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
};

export default GridContainer;
