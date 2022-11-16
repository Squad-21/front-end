import {default as SnackbarElement} from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({
    isOpen,
    setIsOpen,
    type
}) => {

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  return (
      <SnackbarElement 
        open={isOpen} 
        autoHideDuration={6000} 
        onClose={handleClose}
      >
        <Alert 
            onClose={handleClose} 
            severity={type}
            sx={{ width: '100%' }}
        >
          {type == 'success' && 'Sucesso!'}
        </Alert>
      </SnackbarElement>
  );
}

export default Snackbar;