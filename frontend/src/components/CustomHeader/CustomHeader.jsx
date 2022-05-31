// Material-UI components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const CustomHeader = ({ header, desc = true }) => {
  const { API_URL } = process.env;
  let styles = {};
  if (header?.coverImage?.data) {
    const { url } = header.coverImage.data.attributes;
    styles = {
      backgroundColor: '#333',
      backgroundImage: `url(${API_URL}${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#FFF',
      backgroundBlendMode: 'overlay',
    };
  }
  return (
    <Box
      component="header"
      style={styles}
      sx={{
        backgroundColor: header?.background_color
          ? header.background_color
          : 'grey.100',
        color: header?.font_color ? header.font_color : '#000',
      }}
    >
      <Container>
        <div>
          <h1>{header?.title}</h1>
          {desc && <p>{header?.description}</p>}
        </div>
      </Container>
    </Box>
  );
};

export default CustomHeader;
