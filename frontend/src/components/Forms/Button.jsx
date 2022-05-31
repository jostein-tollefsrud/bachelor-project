// Material-UI components
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, ...rest }) => {
  const { submitForm } = useFormikContext();

  // const handleSubmit = () => {
  //   submitForm();
  // };

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: false,
    type: 'submit',
    //onClick: handleSubmit,
  };

  return (
    <Button {...configButton} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
