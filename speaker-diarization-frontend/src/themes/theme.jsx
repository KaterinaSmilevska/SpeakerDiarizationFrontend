import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#0D0C1D',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'linear-gradient(180deg, #0D0C1D, #0E1D2F, #0F1D30)',
                },
            },
        },
    },
});

export default theme;
