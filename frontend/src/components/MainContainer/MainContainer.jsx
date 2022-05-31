// Material-UI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const MainContainer = ({
  children,
  component = 'div',
  backgroundColor = '#FFF',
  backgroundImage = null,
  fontColor = 'black',
  centered = false,
}) => {
  return (
    <Box
      component={component}
      sx={{
        backgroundColor: backgroundColor,
        color: fontColor,
        px: { xs: 1, sm: 2, md: 4, lg: 10 },
        py: { xs: 8, sm: 10, md: 12, lg: 14 },
        backgroundImage: backgroundImage,
        // maxWidth: centered ? '80ch' : '100%',
        textAlign: centered ? 'left' : 'center',
        mx: 'auto',
      }}
    >
      <Container maxWidth={centered ? false : 'lg'} sx={{ maxWidth: '80ch' }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainContainer;
