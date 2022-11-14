import AddIcon from '@mui/icons-material/Add';
import { Style } from '../../constants/style';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fab } from '@mui/material';

let theme = createTheme({
    palette: {
      primary: {
        main: Style.colors['violet-550'],
      }
    },
});

const FabButton = ({onClick}) => {
    return ( 
        <ThemeProvider theme={theme}>
            <Fab 
                color='primary'
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,

                }}
                onClick={onClick}
            >
                <AddIcon />
            </Fab>
        </ThemeProvider>
    );
}
 
export default FabButton;