import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Material-UI components
import Box from '@mui/material/Box';

const Layout = ({ children, navigation, footer }) => {
  return (
    <>
      <Box
        minHeight="100vh"
        display="grid"
        gridTemplateColumns="100%"
        gridTemplateRows="auto 1fr auto"
      >
        <Navbar navigation={navigation} />
        <Box>{children}</Box>
        <Footer footer={footer} />
      </Box>
    </>
  );
};

export default Layout;
